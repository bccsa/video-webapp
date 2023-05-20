from pyrseas import dbtoyaml

# Specify the database connection details
db_uri = "host='localhost dbname='app-bcc-africa-src' user='pgadmin' password='12345678'"

# Specify the output file path for the generated YAML
output_file = '../cms-snapshot.yaml'

# Run dbtoyaml to extract the database structure and generate YAML
dbtoyaml(db_uri, output_file)