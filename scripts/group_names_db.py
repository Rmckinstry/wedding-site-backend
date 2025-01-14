import psycopg2

# Connection details
# Replace these with your actual PostgreSQL server details
host = "localhost"
port = 5432
database = "testdb"
user = "postgres"
password = "password"

# Establishing the connection
conn = psycopg2.connect(
    host=host,
    port = port,
    database=database,
    user=user,
    password=password
)

# Creating a cursor object using the cursor() method
cur = conn.cursor()


# List of group names from the image
group_names = [
    "Monique & Dan McKinstry",
    "Sean McKinstry",
    "Austin Summers & Tess Kelley",
    "Tyler McNutt & Shelby Baggett",
    "Jakob Speta",
    "Christian LeDuc",
    "Debbie & Paul McVane",
    "Carol Boucher",
    "Michael & Tori McVane",
    "Jessica & Dylan Bradley",
    "Michelle Irish & David Walters",
    "Brittany & Matt Naumec",
    "Tim & Anna Irish",
    "John & Kathy McKinstry",
    "Tony & Gail McKinstry",
    "Ray & Anne Marie McKinstry",
    "Alan & Anne Marie McKinstry",
    "Patricia Kennan",
    "Maureen & Rodger Mandeville",
    "Kate Mandeville",
    "Rodger Jr Mandeville",
    "Allen & Kerry Ferraro",
    "Joanne & Ian McDaid",
    "Ray Jr. & Jannice McKinstry",
    "Amy & Rich Stoddard",
    "Corrine McKinstry & Sam Miano",
    "Audrey & Jean Paul Dumais",
    "Jason & Amanda Kennan",
    "Brenden Kennan",
    "Camden & Brooke McKinstry",
    "Patrick McKinstry",
    "Kelly McKinstry",
    "Amy & Frank Wilson",
    "Jack Wilson",
    "Laurie & Jim Gaut",
    "Catherine Gaut",
    "Katie & Steve Bigus",
    "Mike & ??? McKinstry",
    "Michael Kail",
    "Brandon Kail & Ava Lavalle",
    "Jakob Walls",
    "Eliza Ford",
    "Beth Churchill",
    "Laura & Tony Curbo",
    "Keith & Cindy Kail",
    "Samuel & Brittany Kail",
    "Isabella Kail & Jacob Kubik",
    "Riley & KK Kail",
    "Peggy & Philip Leadford",
    "Gwen Brown",
    "Michael & Karen Brown",
    "Meghan & Alex Silva",
    "Jamie & Alex Evans",
    "Steven & Amanda Brown",
    "Chris Brown",
    "Sarah & Jeremiah Green",
    "Robert & Sherri Joyner (The Joyner Family)",
    "Nolan Joyner",
    "Sims Burke",
    "Bill Abernathy",
    "Lee & Samantha Feil",
    "Colleen & Russ Caughron",
    "Savanna & Zachary Martin",
    "Danny & Denise Berryhill",
    "Archie & Marie Hill",
    "Alyssa & Gwendolyn Hayes",
    "Dwight Walls",
    "Bob & Martha Ford",
    "Brittany Jones",
    "Alexis Lopez"
]

# Inserting the group names into the table
for name in group_names:
    cur.execute("INSERT INTO groups (group_name) VALUES (%s)", (name,))

# Commit the transaction
conn.commit()

# Closing the connection
cur.close()
conn.close()

print("Data insertion completed successfully.")