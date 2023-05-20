from pyrseas import dbtoyaml

# Specify the database connection details
#db_uri = "host='localhost dbname='app-bcc-africa-src' user='pgadmin' password='12345678'"

# Specify the output file path for the generated YAML
#output_file = '../cms-snapshot.yaml'

# Run dbtoyaml to extract the database structure and generate YAML
#dbtoyaml(db_uri, output_file)

import json
from jsondiff import diff
import yaml
from yaml.loader import SafeLoader
import string

file1 = '../cms-snapshot-F.yaml'
file2 = '../cms-snapshot.yaml'
output_file = 'differences.yaml'

def remove_non_printable_characters(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    printable_chars = set(string.printable)
    filtered_content = ''.join(filter(lambda x: x in printable_chars, content))

    with open(file_path, 'w') as file:
        file.write(filtered_content)

def compare_yaml(file1,file2):
    with open(file1) as f1, open(file2) as f2:
        data1 = yaml.load(f1, Loader=SafeLoader)
        data2 = yaml.load(f2, Loader=SafeLoader)
        differences = diff(data1,data2)
        return differences
    
def save_differences(differences, output_file):
    with open(output_file, 'w') as f:
        f.write(json.dumps(differences, indent=2))

remove_non_printable_characters(file1)
remove_non_printable_characters(file2)

differences = compare_yaml(file1,file2)

save_differences(differences, output_file)