import os
import sys
import json
import urllib.request

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
BRANDING_FILE = "branding.json"

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

def select_from_list(items, title, multiple=False):
    """Generic function to prompt user to select one or more items from a list."""
    print(f"\n--- {title} ---")
    if not items:
        print("No items found.")
        return None if not multiple else []

    for i, item in enumerate(items):
        display_name = os.path.basename(item) if isinstance(item, str) else item
        print(f"  {i + 1}: {display_name}")

    prompt = f"Please select a number (1-{len(items)}): "
    if multiple:
        prompt = f"Please select one or more numbers separated by commas (e.g., 1, 3, 5): "

    while True:
        user_input = input(prompt)
        try:
            if not multiple:
                choice = int(user_input)
                if 1 <= choice <= len(items):
                    return items[choice - 1]
                else:
                    print("Invalid number. Please try again.")
            else:
                if not user_input.strip():
                    print("No selection made. Please try again.")
                    continue
                
                choices = [int(i.strip()) for i in user_input.split(',') if i.strip()]
                
                valid_selections = []
                invalid_numbers = []
                for choice in choices:
                    if 1 <= choice <= len(items):
                        valid_selections.append(items[choice - 1])
                    else:
                        invalid_numbers.append(choice)

                if invalid_numbers:
                    print(f"Invalid number(s) found: {invalid_numbers}. Please select from 1 to {len(items)}.")
                    continue
                
                if not valid_selections:
                    print("No valid selections made. Please try again.")
                    continue

                return valid_selections

        except ValueError:
            print("Invalid input. Please enter only numbers.")

def main():
    """Main function to run the interactive document conversion agent."""
    print("--- HERE AND NOW AI: Document Conversion Agent ---")

    if not check_pandoc_installation():
        sys.exit(1)

    # 1. Discover and select the source document(s)
    documents = discover_documents(SOURCE_DIRECTORY)
    if not documents:
        print(f"No source documents (.md, .txt) found in the '{SOURCE_DIRECTORY}' directory.")
        sys.exit(0)

    source_paths = select_from_list(documents, "Select Document(s) to Convert", multiple=True)
    if not source_paths:
        print("No documents selected. Exiting.")
        sys.exit(0)

    # 2. Select the output format
    output_format = select_from_list(SUPPORTED_FORMATS, "Select an Output Format")
    if not output_format:
        sys.exit(0)

    # 3. Combine content if multiple files are selected
    combined_content = ""
    if len(source_paths) > 1:
        print("\nCombining documents...")
        for path in source_paths:
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    combined_content += f.read() + "\n\n---\n\n"
                print(f"  - Added {os.path.basename(path)}")
            except Exception as e:
                print(f"Error reading file {path}: {e}")
    else:
        try:
            with open(source_paths[0], 'r', encoding='utf-8') as f:
                combined_content = f.read()
        except Exception as e:
            print(f"Error reading file {source_paths[0]}: {e}")
            sys.exit(1)

    if not combined_content.strip():
        print("Could not read any content from selected files. Exiting.")
        sys.exit(1)

    # 4. Determine output path
    os.makedirs(OUTPUT_DIRECTORY, exist_ok=True)
    if len(source_paths) == 1:
        base_name = os.path.splitext(os.path.basename(source_paths[0]))[0]
    else:
        while True:
            base_name = input("\nPlease enter a filename for the combined output (without extension): ").strip()
            if base_name:
                break
            else:
                print("Filename cannot be empty.")

    output_path = os.path.join(OUTPUT_DIRECTORY, f"{base_name}.{output_format}")

    # 5. Convert the document
    source_display_names = [os.path.basename(p) for p in source_paths]
    print(f"\nConverting {', '.join(source_display_names)} to '{output_format}'...")

    extra_args = []
    header_file = None
    temp_logo_path = None
    
    if output_format == 'pdf':
        try:
            # Load branding info
            with open(BRANDING_FILE, 'r') as f:
                branding = json.load(f)['brand']
            
            logo_url = branding.get('logo', {}).get('title')
            if not logo_url:
                raise ValueError("Logo URL not found in branding.json")

            # Download logo
            temp_logo_path = "temp_logo.png"
            print(f"Downloading logo from {logo_url}...")
            urllib.request.urlretrieve(logo_url, temp_logo_path)
            print("Logo downloaded successfully.")

            # Create LaTeX header content using a raw, formatted string
            latex_header_content = fr"""
\usepackage[top=1.5in, bottom=1in, left=1in, right=1in]{{geometry}}
\usepackage{{graphicx}}
\usepackage{{fancyhdr}}
\pagestyle{{fancy}}
\fancyhf{{}}
\fancyhead[C]{{\includegraphics[width=4cm]{{{temp_logo_path}}}}}
\fancyfoot[C]{{{branding.get('organizationName', '')} | {branding.get('email', '')} | {branding.get('mobile', '')} | {branding.get('website', '')}}}
\renewcommand{{\headrulewidth}}{{0pt}}
\renewcommand{{\footrulewidth}}{{0.4pt}}
"""
            header_file = "margins.tex"
            with open(header_file, "w") as f:
                f.write(latex_header_content)
            
            extra_args = [f'--include-in-header={header_file}']
            print("Applying custom PDF header and footer...")

        except Exception as e:
            print(f"Warning: Could not create branded PDF header/footer. Proceeding with default settings. Error: {e}")
            header_file = None
            if temp_logo_path and os.path.exists(temp_logo_path):
                os.remove(temp_logo_path)
            temp_logo_path = None

    try:
        pypandoc.convert_text(
            combined_content,
            output_format,
            format='md',
            outputfile=output_path,
            extra_args=extra_args
        )
        print("\n--- ✅ Success! ---")
        print(f"Your file has been saved to: {output_path}")
        print("--------------------")
    except Exception as e:
        print("\n--- ❌ Error ---")
        print(f"An error occurred during conversion: {e}")
        print("-----------------")
    finally:
        # Clean up temporary files
        if header_file and os.path.exists(header_file):
            os.remove(header_file)
        if temp_logo_path and os.path.exists(temp_logo_path):
            os.remove(temp_logo_path)
        if header_file or temp_logo_path:
            print("Cleaned up temporary files.")

if __name__ == "__main__":
    main()