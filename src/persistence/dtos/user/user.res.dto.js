export default class productResDTO {
    constructor(user){
        this._Id = user._id,
        this.first_name =  user.first_name,
        this.last_name  = user.last_name,
        this.email =  user.email,
        this.role  = user.role,
        this.cart  = user.cart
        this.last_connection = user.last_connection;
    }
}