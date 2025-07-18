from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, END
import requests
from weasyprint import HTML
import os

# Define the state for our graph
class AgentState(TypedDict):
    urls: list[str]
    current_url_content: str
    current_url_name: str

# Node to fetch content from a URL
def fetch_content(state: AgentState):
    urls = state['urls']
    if not urls:
        print("No URLs to fetch.")
        return {"current_url_content": "", "current_url_name": ""}

    url = urls.pop(0) # Get the first URL and remove it
    print(f"Fetching content from: {url}")
    try:
        response = requests.get(url)
        response.raise_for_status() # Raise an HTTPError for bad responses (4xx or 5xx)
        content = response.text
        # Extract a simple name for the file from the URL
        url_name = url.split('/')[-1].split('?')[0] or "profile"
        if url_name.endswith('.pub'): # Specific to Google Docs public URLs
            url_name = "hereandnowai_profile"
        print(f"Successfully fetched content from {url}")
        return {"current_url_content": content, "current_url_name": url_name, "urls": urls}
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return {"current_url_content": "", "current_url_name": "", "urls": urls}

# Node to save content as a .txt file
def save_as_txt(state: AgentState):
    content = state['current_url_content']
    file_name = state['current_url_name']
    if not content:
        print("No content to save as TXT.")
        return state

    txt_file_path = os.path.join("files", f"{file_name}.txt")
    try:
        with open(txt_file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Content saved to {txt_file_path}")
    except IOError as e:
        print(f"Error saving TXT file {txt_file_path}: {e}")
    return state

# Node to save content as a .pdf file
def save_as_pdf(state: AgentState):
    content = state['current_url_content']
    file_name = state['current_url_name']
    if not content:
        print("No content to save as PDF.")
        return state

    pdf_file_path = os.path.join("files", f"{file_name}.pdf")
    try:
        # WeasyPrint expects HTML. Wrap the plain text in a basic HTML structure.
        # This will result in a very basic PDF without original Google Docs formatting.
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>{file_name}</title>
        </head>
        <body>
            <pre>{content}</pre>
        </body>
        </html>
        """
        HTML(string=html_content).write_pdf(pdf_file_path)
        print(f"Content saved to {pdf_file_path}")
    except Exception as e:
        print(f"Error saving PDF file {pdf_file_path}: {e}")
    return state

# Define the graph
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("fetch", fetch_content)
workflow.add_node("save_txt", save_as_txt)
workflow.add_node("save_pdf", save_as_pdf)

# Set up the entry point
workflow.set_entry_point("fetch")

# Define the conditional edge from fetch
def should_continue(state: AgentState):
    if state['current_url_content']:
        return "save_txt"
    elif state['urls']:
        return "fetch"
    else:
        return "END"

workflow.add_conditional_edges(
    "fetch",
    should_continue,
    {
        "save_txt": "save_txt",
        "fetch": "fetch",
        "END": END,
    },
)

workflow.add_edge("save_txt", "save_pdf")

# After saving, go back to fetch the next URL if any, otherwise end.
workflow.add_conditional_edges(
    "save_pdf",
    lambda state: "fetch" if state["urls"] else "END",
    {"fetch": "fetch", "END": END},
)

# Compile the graph
app = workflow.compile()

if __name__ == "__main__":
    # Ensure the 'files' directory exists
    if not os.path.exists("files"):
        os.makedirs("files")

    # URLs from your main.py
    urls_to_process = [
        "https://docs.google.com/document/d/e/2PACX-1vSxvmevitLNo10pHQ1tJYAokR7ERE7I6N-n6SCQFvOQEXcZVnH3L2i6QoHMAhErY_n95GwJtXijGI3R/pub"
    ]

    # Initial state for the agent
    initial_state = {"urls": urls_to_process, "current_url_content": "", "current_url_name": ""}

    # Run the agent
    for s in app.stream(initial_state):
        print(s)
