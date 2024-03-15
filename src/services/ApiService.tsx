import axios, { AxiosError, AxiosResponse } from 'axios';
import { ENV_VARIABLES } from '../constants';

import { QuizType } from '../Types/QuizType';
import { FolderType } from '../Types/FolderType';

class ApiService {
    private BASE_URL: string;

    constructor() {
        this.BASE_URL = ENV_VARIABLES.VITE_BACKEND_URL;
    }

    private constructRequestUrl(endpoint: string): string {
        return `http://${this.BASE_URL}${endpoint}`;
    }

    private constructRequestHeaders(): any {
        if (this.isLogedIn()) {
            return {
                Authorization: `Bearer ${this.getToken()}`,
                'Content-Type': 'application/json'
            };
        }
        else {
            return {
                'Content-Type': 'application/json'
            };
        }
    }

    // Helpers
    private saveToken(token: string): void {
        localStorage.setItem("jwt", token);
    }

    private getToken(): string | null {
        return localStorage.getItem("jwt");
    }

    public isLogedIn(): boolean {
        const token = this.getToken()

        if (token == null) {
            return false;
        }

        return true;
    }

    public logout(): void {
        return localStorage.removeItem("jwt");
    }

    // User Routes

    /**
     * @returns true if  successful 
     * @returns A error string if unsuccessful,
     */
    public async register(email: string, password: string): Promise<any> {
        try {

            if (!email || !password) {
                throw new Error(`L'email et le mot de passe sont requis.`);
            }

            const url: string = this.constructRequestUrl(`/user/register`);
            const headers = this.constructRequestHeaders();
            const body = { email, password };

            const result: AxiosResponse = await axios.post(url, body, headers);

            if (result.status !== 200) {
                throw new Error(`L'enregistrement a échoué. Status: ${result.status}`);
            }

            return true;

        } catch (error) {
            console.log("Error details: ", error);

            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;
                const data = err.response?.data as { error: string } | undefined;
                return data?.error || 'Erreur serveur inconnue lors de la requête.';
            }

            return `Une erreur inattendue s'est produite.`
        }
    }

    /**
     * @returns true if  successful 
     * @returns A error string if unsuccessful,
     */
    public async login(email: string, password: string): Promise<any> {
        try {

            if (!email || !password) {
                throw new Error(`L'email et le mot de passe sont requis.`);
            }

            const url: string = this.constructRequestUrl(`/user/login`);
            const headers = this.constructRequestHeaders();
            const body = { email, password };

            const result: AxiosResponse = await axios.post(url, body, headers);

            if (result.status !== 200) {
                throw new Error(`La connexion a échoué. Status: ${result.status}`);
            }

            this.saveToken(result.data.results.token);

            return true;

        } catch (error) {
            console.log("Error details: ", error);

            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;
                const data = err.response?.data as { error: string } | undefined;
                return data?.error || 'Erreur serveur inconnue lors de la requête.';
            }

            return `Une erreur inattendue s'est produite.`
        }
    }

    /**
     * @returns true if  successful 
     * @returns A error string if unsuccessful,
     */
    public async resetPassword(email: string): Promise<any> {
        try {

            if (!email) {
                throw new Error(`L'email est requis.`);
            }

            const url: string = this.constructRequestUrl(`/user/reset-password`);
            const headers = this.constructRequestHeaders();
            const body = { email };

            const result: AxiosResponse = await axios.post(url, body, headers);

            if (result.status !== 200) {
                throw new Error(`Échec de la réinitialisation du mot de passe. Status: ${result.status}`);
            }

            return true;

        } catch (error) {
            console.log("Error details: ", error);

            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;
                const data = err.response?.data as { error: string } | undefined;
                return data?.error || 'Erreur serveur inconnue lors de la requête.';
            }

            return `Une erreur inattendue s'est produite.`
        }
    }

    /**
     * @returns true if  successful 
     * @returns A error string if unsuccessful,
     */
    public async changePassword(email: string, oldPassword: string, newPassword: string): Promise<any> {
        try {

            if (!email || !oldPassword || !newPassword) {
                throw new Error(`L'email, l'ancien et le nouveau mot de passe sont requis.`);
            }

            const url: string = this.constructRequestUrl(`/user/change-password`);
            const headers = this.constructRequestHeaders();
            const body = { email, oldPassword, newPassword };

            const result: AxiosResponse = await axios.post(url, body, headers);

            if (result.status !== 200) {
                throw new Error(`Le changement du mot de passe a échoué. Status: ${result.status}`);
            }

            return true;

        } catch (error) {
            console.log("Error details: ", error);

            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;
                const data = err.response?.data as { error: string } | undefined;
                return data?.error || 'Erreur serveur inconnue lors de la requête.';
            }

            return `Une erreur inattendue s'est produite.`
        }
    }

    /**
     * @returns true if  successful 
     * @returns A error string if unsuccessful,
     */
    public async deleteUser(email: string, password: string): Promise<any> {
        try {

            if (!email || !password) {
                throw new Error(`L'email et le mot de passe sont requis.`);
            }

            const url: string = this.constructRequestUrl(`/user/delete-user`);
            const headers = this.constructRequestHeaders();
            const body = { email, password };

            const result: AxiosResponse = await axios.post(url, body, headers);

            if (result.status !== 200) {
                throw new Error(`La supression du compte a échoué. Status: ${result.status}`);
            }

            return true;

        } catch (error) {
            console.log("Error details: ", error);

            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;
                const data = err.response?.data as { error: string } | undefined;
                return data?.error || 'Erreur serveur inconnue lors de la requête.';
            }

            return `Une erreur inattendue s'est produite.`
        }
    }































































    // Folder Routes
    public async createFolder(title: string): Promise<any> {
        const url: string = `${this.BASE_URL}/folder/create`;
        const headers = {
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        };
        const body = {
            title: title
        };

        const result: AxiosResponse = await axios.post(url, body, { headers: headers });
        console.log(result);
        // code == 200
    }

    public async getUserFolders(): Promise<FolderType[]> {
        const url: string = `${this.BASE_URL}/folder/getUserFolders`;
        const headers = {
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        };
        try {
            const response: AxiosResponse = await axios.get(url, { headers: headers });
            if (response.status === 200) {
                return response.data.results.map((folder: FolderType) => ({ _id: folder._id, title: folder.title }));
            } else {
                throw new Error('Failed to fetch user folders');
            }
        } catch (error) {
            console.error('Error fetching user folders:', error);
            throw error; // Optional: rethrow the error to handle it elsewhere
        }
    }

    public async getFolderContent(folderId: string): Promise<QuizType[]> {
        const url: string = `${this.BASE_URL}/folder/getFolderContent/${folderId}`;
        const headers = {
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        };

        try {
            const response: AxiosResponse = await axios.get(url, { headers: headers });
            if (response.status === 200) {
                // Assuming the response contains a list of quizzes
                return response.data.results.map((quiz: QuizType) => ({ _id: quiz._id, title: quiz.title, content: quiz.content }));
            } else {
                throw new Error('Failed to fetch folder content');
            }
        } catch (error) {
            console.error('Error fetching folder content:', error);
            throw error;
        }
    }

    public async deleteFolder(folderId: string): Promise<void> {
        const url: string = `${this.BASE_URL}/folder/delete/${folderId}`;
        const headers = {
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        };

        const result: AxiosResponse = await axios.delete(url, { headers: headers });
        console.log(result);
        // code == 200
    }

    public async renameFolder(folderId: string, newTitle: string): Promise<void> {
        const url: string = `${this.BASE_URL}/folder/rename`;
        const headers = {
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        };
        const body = {
            folderId: folderId,
            newTitle: newTitle
        };

        const result: AxiosResponse = await axios.put(url, body, { headers: headers });
        console.log(result);
        // code == 200
    }

    public async duplicateFolder(folderId: string, newTitle: string): Promise<any> {
        return "Route not implemented yet!";
    }

    public async copyFolder(folderId: string, newTitle: string): Promise<any> {
        return "Route not implemented yet!";
    }
































    // Quiz Routes


    public async createQuiz(title: string, content: string[], folderId: string): Promise<void> {
        const url: string = `${this.BASE_URL}/quiz/create`;
        const headers = {
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        };
        const body = {
            title: title,
            content: content,
            folderId: folderId
        };

        try {
            const result: AxiosResponse = await axios.post(url, body, { headers: headers });
            console.log(result);
            // code == 200
        } catch (error) {
            console.error('Error creating quiz:', error);
            throw error; // Optional: rethrow the error to handle it elsewhere
        }
    }

    public async getQuiz(quizId: string): Promise<QuizType> {
        const url: string = `${this.BASE_URL}/quiz/get/${quizId}`;
        const headers = {
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        };

        try {
            const result: AxiosResponse = await axios.get(url, { headers: headers });
            //console.log(result);
            // Assuming result.data contains the quiz information

            return result.data.results as QuizType;
        } catch (error) {
            console.error('Error getting quiz:', error);
            throw error; // Optional: rethrow the error to handle it elsewhere
        }
    }

    public async deleteQuiz(quizId: string): Promise<void> {
        const url: string = `${this.BASE_URL}/quiz/delete/${quizId}`;
        const headers = {
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        };

        try {
            const result: AxiosResponse = await axios.delete(url, { headers: headers });
            console.log(result);
            // code == 200
        } catch (error) {
            console.error('Error deleting quiz:', error);
            throw error; // Optional: rethrow the error to handle it elsewhere
        }
    }

    public async updateQuiz(quizId: string, newTitle: string, newContent: string[]): Promise<void> {
        const url: string = `${this.BASE_URL}/quiz/update`;
        const headers = {
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        };
        const body = {
            quizId: quizId,
            newTitle: newTitle,
            newContent: newContent
        };

        try {
            const result: AxiosResponse = await axios.put(url, body, { headers: headers });
            console.log(result);
            // code == 200
        } catch (error) {
            console.error('Error updating quiz:', error);
            throw error; // Optional: rethrow the error to handle it elsewhere
        }
    }

    public async moveQuiz(quizId: string, newFolderId: string): Promise<void> {
        const url: string = `${this.BASE_URL}/quiz/move`;
        const headers = {
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        };
        const body = {
            quizId: quizId,
            newFolderId: newFolderId
        };

        const result: AxiosResponse = await axios.put(url, body, { headers: headers });
        console.log(result);
        // code == 200
    }

    public async duplicateQuiz(quizId: string, newTitle: string, folderId: null): Promise<any> {
        return "Route not implemented yet!";
    }

    public async copyQuiz(quizId: string, newTitle: string, folderId: null): Promise<any> {
        return "Route not implemented yet!";
    }



























    // Images Route

    /**
     * @returns the image URL (string) if successful 
     * @returns A error string if unsuccessful,
     */
    public async uploadImage(image: File): Promise<string> {
        try {

            if (!image) {
                throw new Error(`L'image est requise.`);
            }

            const url: string = this.constructRequestUrl(`/image/upload`);

            const headers = {
                Authorization: `Bearer ${this.getToken()}`,
                'Content-Type': 'multipart/form-data'
            };

            const formData = new FormData();
            formData.append('image', image);

            const result: AxiosResponse = await axios.post(url, formData, { headers: headers });

            if (result.status !== 200) {
                throw new Error(`L'enregistrement a échoué. Status: ${result.status}`);
            }

            const id = result.data.results.id;

            return this.constructRequestUrl('/image/get/' + id);

        } catch (error) {
            console.log("Error details: ", error);

            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;
                const data = err.response?.data as { error: string } | undefined;
                return data?.error || 'Erreur serveur inconnue lors de la requête.';
            }

            return `Une erreur inattendue s'est produite.`
        }
    }
    // NOTE : Get Image pas necessaire

}

const apiService = new ApiService();
export default apiService;
