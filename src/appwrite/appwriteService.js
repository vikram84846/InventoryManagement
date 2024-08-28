import { Client, Account, Databases, ID, Query } from "appwrite";


// Initialize the client
const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// Initialize the databases and account
const databases = new Databases(client);
const account = new Account(client);


// Collection configurations
const collections = [
    {
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_PRODUCTS_ID,
        name: 'products'
    },
    {
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_CATGEORY_ID,
        name: 'categories'
    },
    {
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_HISTORY_ID,
        name: 'history'
    },
    {
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_LOCATION_ID,
        name: 'locations'
    }
];

// Initialize the db object
const db = {};

collections.forEach(col => {
    db[col.name] = {
        create: async (data) => {
            try {
                const response = await databases.createDocument(
                    col.databaseId,
                    col.collectionId,
                    ID.unique(),
                    data
                );
                return response;
            } catch (error) {
                console.log(`Error creating document in ${col.name} collection:`, error);
                throw error;
            }
        },
        list: async (query = [Query.orderDesc('$createdAt')]) => {
            try {
                if (col.name === 'products') {
                    query.push(Query.limit(200));
                }
                const response = await databases.listDocuments(
                    col.databaseId,
                    col.collectionId,
                    query
                );
                return response;
            } catch (error) {
                // console.log(`Error listing documents in ${col.name} collection:`, error);
                throw error;
            }
        },
        update: async (documentId, data) => {
            try {
                const response = await databases.updateDocument(
                    col.databaseId,
                    col.collectionId,
                    documentId,
                    data
                );
                return response;
            } catch (error) {
                console.log(`Error updating document in ${col.name} collection:`, error);
                throw error;
            }
        },
        delete: async (documentId) => {
            try {
                const response = await databases.deleteDocument(
                    col.databaseId,
                    col.collectionId,
                    documentId
                );
                return response;
            } catch (error) {
                console.log(`Error deleting document in ${col.name} collection:`, error);
                throw error;
            }
        },
        get: async (documentId) => {
            try {
                const response = await databases.getDocument(
                    col.databaseId,
                    col.collectionId,
                    documentId
                );
                return response;
            } catch (error) {
                console.log(`Error getting document from ${col.name} collection:`, error);
                throw error;
            }
        }
    };
});




// Authentication functions
const auth = {
    create: async (name, email, password) => {
        try {
            const response = await account.create(
                ID.unique(),
                email,
                password,
                name
            );
            console.log('User created successfully:', response);

            // Send verification email
            // const verificationResponse = await account.createVerification(
            //     'http://localhost:5173/verify-email' 
            // );
            // console.log('Verification email sent:', verificationResponse);

            return response;
        } catch (error) {
            console.log('Error while creating user:', error.message);
            throw error;
        }
    },

    login: async (email, password) => {
        try {
            await account.createEmailPasswordSession(email, password);
            console.log('User logged in successfully');
            return await account.get();
        } catch (error) {
            if (error.response && error.response.status === 401) { // Unauthorized, wrong email or password
                const errorMessage = error.response.data.message;
                if (errorMessage.includes("Invalid email")) {
                    console.error('Wrong email entered.');
                } else if (errorMessage.includes("Invalid password")) {
                    console.error('Wrong password entered.');
                } else {
                    console.error('Unauthorized access.');
                }
            } else {
                console.error('An unexpected error occurred:', error.message);
            }
            throw error;
        }
    },

    logout: async () => {
        try {
            await account.deleteSessions();
            console.log('User logged out successfully');
        } catch (error) {
            console.log('Error while logging out: ' + error.message);
        }
    },

    verifyEmail: async (userId, secret) => {
        try {
            const response = await account.updateVerification(userId, secret);
            console.log('Email verified successfully:', response);
            return response;
        } catch (error) {
            console.log('Error while verifying email:', error.message);
            throw error;
        }
    },
    loginWithGoogle: async () => {
        try {
            const response = account.createOAuth2Session(
                'google',
                // 'https://store-red-eight.vercel.app/profile',
                // 'https://store-red-eight.vercel.app/signup',
                'http://localhost:5173/profile',
                'http://localhost:5173/signup'
            );
            console.log('User logged in with Google:', response);
        } catch (error) {
            console.log('Error while logging in with Google:', error.message);
            throw error;
        }
    },
    getAccount: async () => {
        try {
            const response = await account.get(); // Get the current authenticated user's data
            console.log('User data:', response);
            return response;
        } catch (error) {
            console.log('Error fetching user data:', error.message);
            throw error;
        }
    }
};


export {
    db,
    auth
};
