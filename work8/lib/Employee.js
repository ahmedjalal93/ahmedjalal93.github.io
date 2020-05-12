// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = "Employee";
    }

    getName(){
        if (this.name.match(/[0-9a-zA-Z]+$/gi)){
            return this.name;
        }else{
            console.log("Input a proper name");
        }
    }

    getId(){
        if (/^\d+$/.test(this.id)){
            return Number(this.id);
        }else{
            console.log("Input a proper ID");
        }
    }

    getEmail(){
        if (/\S+@\S+\.\S+/.test(this.email)){
            return this.email;
        }else{
            console.log("Input a proper name");
        }
    }

    getRole(){
        return this.role;
    }
}

module.exports = Employee;