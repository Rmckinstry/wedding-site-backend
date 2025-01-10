import psycopg2

# Connection details
# Replace these with your actual PostgreSQL server details
host = "localhost"
port = 5432
database = "test_db"
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
    "Monique & Daniel McKinstry", "Sean McKinstry", "Austin Summers", "Tyler McNutt", "Jakob Speta", "Christian LeDuc", "Debbie & Paul MacVane", "Michael & Tori MacVane", "Jessica & Dylan Bradley", "Michelle Irish & David Walters", "Brittany Naumec & Matt Naumec", "Tim & Anna Irish", "Carol Boucher", "Jack & Kathy McKinstry", "Terry & Gail McKinstry", "Ray & Anne Marie McKinstry", "Alan & Anne Marie McKinstry", "Trish Kennan", "Maureen & Rodger Mandeville", "Kate Mandeville", "Rodger Jr Mandeville", "Joanne & Ian McDaid", "Ray Jr & Jannice McKinstry", "Amy & Rich Stoddard", "Corinne McKinstry & Sam", "Audrey & Jean Paul Dumais", "Jason & Amanda Kennan", "Brendan Kennan", "Patrick McKinstry", "Camden & Brooke McKinstry", "Kelly McKinstry", "Amy & Frank Wilson", "Jack Wilson", "Laurie & Jim Gaut", "Catherine Gaut", "Katie & Steve Bigus", "Mike & Wife McKinstry", "Michael Kail", "Brandon Kail & Ava Lavalle", "Jakob Walls", "Eliza Ford", "Beth Churchill", "Tess Kelley", "Shelby Baggett", "Laura & Tony Curbo", "Keith & Cindy Kail", "Samuel & Brittany Kail", "Isabella & Jacob", "Riley & KK Kail", "Peggy & Philip Leadford", "Gina Bitinis", "Michael & Karen Brown", "Meghan & Alex Silva", "Jamie & Alex Evans", "Steven & Amanda Brown", "Chris Brown", "Sarah & Jeremiah Green", "Maddox Green", "Robert & Sherri Joyner", "Nolan Joyner", "Hudson Joyner", "Sims Burke", "Bill Abernathy", "Lee & Samantha Feil", "Colleen & Russ Caughron", "Savanna & Zachary Martin", "Danny & Denise Berryhill", "Archie & Wife", "Alvin & Wife Hayes", "Dwight Walls"
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