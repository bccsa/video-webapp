# Libraries
import sys
import json
from jsondiff import diff
import yaml
from yaml.loader import SafeLoader
import string

# Global varaibles
SRCFILE = sys.argv[1]
DSTFILE = sys.argv[2]
output_file = sys.argv[3]

# Functions
def remove_non_printable_characters(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    printable_chars = set(string.printable)
    filtered_content = ''.join(filter(lambda x: x in printable_chars, content))

    with open(file_path, 'w') as file:
        file.write(filtered_content)

# params 1. dstfile, param 2. src file
def compare_yaml(dst,src):
    with open(dst) as f1, open(src) as f2:
        data1 = yaml.load(f1, Loader=SafeLoader)
        data2 = yaml.load(f2, Loader=SafeLoader)
        differences = diff(data1,data2)
        return differences
    
def save_differences(differences, output_file):
    with open(output_file, 'w') as f:
        f.write(yaml.dump(differences, indent=2))

# Make yaml files readable
remove_non_printable_characters(SRCFILE)
remove_non_printable_characters(DSTFILE)

# Compare src file with dst file
differences = compare_yaml(DSTFILE,SRCFILE)

# Save output file 
save_differences(differences, output_file)
