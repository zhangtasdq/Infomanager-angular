class User {
    constructor(private password:string) {
        
    }

    public getPassword():string {
        return this.password;
    }
}

export default User;