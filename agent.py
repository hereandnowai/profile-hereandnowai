import os
import sys

try:
    import pypandoc
except ImportError:
    print("Error: 'pypandoc' library not found.")
    print("Please install it by running: pip install pypandoc")
    sys.exit(1)

# --- Configuration ---
SOURCE_DIRECTORY = "context"
OUTPUT_DIRECTORY = "generated_documents"
SUPPORTED_FORMATS = ['docx', 'pdf', 'html', 'txt']

def check_pandoc_installation():
    """Checks if pandoc is installed and provides instructions if it's not."""
    try:
        pypandoc.get_pandoc_path()
        return True
    except OSError:
        print("---")
        print("Error: 'pandoc' is not installed on your system, but it's required for document conversion.")
        print("Please install it from the official website: https://pandoc.org/installing.html")
        print("\nInstallation commands for common systems:")
        print("  - Debian/Ubuntu: sudo apt-get install pandoc")
        print("  - macOS (with Homebrew): brew install pandoc")
        print("  - Windows (with Chocolatey): choco install pandoc")
        print("---\n")
        return False

def discover_documents(root_path):
    """Finds all .md and .txt files in the given path."""
    discovered_files = []
    if not os.path.isdir(root_path):
        return []
    for root, _, files in os.walk(root_path):
        for file in files:
            if file.endswith((".md", ".txt")):
                discovered_files.append(os.path.join(root, file))
    return discovered_files

def select_from_list(items, title):
    """Generic function to prompt user to select an item from a list."""
    print(f"\n--- {title} ---")
    if not items:
        print(f"No items found.")
        return None

    for i, item in enumerate(items):
        display_name = os.path.basename(item) if isinstance(item, str) else item
        print(f"  {i + 1}: {display_name}")

    while True:
        try:
            choice = int(input(f"Please select a number (1-{len(items)}): "))
            if 1 <= choice <= len(items):
                return items[choice - 1]
            else:
                print("Invalid number. Please try again.")
        except ValueError:
            print("Invalid input. Please enter a number.")

def main():
    """Main function to run the interactive document conversion agent."""
    print("--- HERE AND NOW AI: Document Conversion Agent ---")

    if not check_pandoc_installation():
        sys.exit(1)

    # 1. Discover and select the source document
    documents = discover_documents(SOURCE_DIRECTORY)
    if not documents:
        print(f"No source documents (.md, .txt) found in the '{SOURCE_DIRECTORY}' directory.")
        sys.exit(0)

    source_path = select_from_list(documents, "Select a Document to Convert")
    if not source_path:
        sys.exit(0)

    # 2. Select the output format
    output_format = select_from_list(SUPPORTED_FORMATS, "Select an Output Format")
    if not output_format:
        sys.exit(0)

    # 3. Convert the document
    os.makedirs(OUTPUT_DIRECTORY, exist_ok=True)
    base_name = os.path.splitext(os.path.basename(source_path))[0]
    output_path = os.path.join(OUTPUT_DIRECTORY, f"{base_name}.{output_format}")

    print(f"\nConverting '{os.path.basename(source_path)}' to '{output_format}'...")
    try:
        pypandoc.convert_file(source_path, output_format, outputfile=output_path)
        print("\n--- ✅ Success! ---")
        print(f"Your file has been saved to: {output_path}")
        print("--------------------")
    except Exception as e:
        print(f"\n--- ❌ Error ---")
        print(f"An error occurred during conversion: {e}")
        print("-----------------")

if __name__ == "__main__":
    main()