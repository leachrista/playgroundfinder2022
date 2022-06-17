class Login {
    constructor(form, fields){
        this.form = form;
        this.fields=fields;
        this.validatonSubmit();

    }
    validatonSubmit(){
        let self = this;
        this.form.addEventListener("submit", (e) =>{
            e.preventDefault();
            var error =0;
            self.fields.forEach((fields)=>{
                const input = document.querySelector('#${field}');
                if(self.validateFields(input)=false){
                    error++;
                }
                if (error ==0){
                    console.log("success");
                }
            });
        })
    }

validateFields(field) {
    if(field.value.trim()==""){
        this.setStatus(
            field,
            `${field.previousElementSibiling.innerText} cannot be
            blank`,
            "error"
        );
        return false;
    } else{
        if(field.type=="password"){
            if(field.value.length<8){
                this.setStatus(
                    field,
                    `${field.previousElementSibiling.innerText} must be  at least 8 character`,

            "error"
                );
                return false;
            }else{
                this.setStatus(field, null, "success");
                return true;
            }
        } else {
            this.setStatus(field, null, "success");
            return true;
        }
    }
}
setStatus(field, message, status){
    const errorMessage = field.parentElement.querySelector(".erroe-message");
    if(status = "success"){
        if(errorMessage){
            errorMessage.innerText=" ";
        }
        field.classList.add("input-error");
    }
    if(status="error"){
        errorMessage.innerText=message;
        field.classList.add("input-errer");
    }
}
}

const form =document.querySelector(".loginForm");
if(form){
    const fields = ["username","password"];
    const validator = new Login(form,fields);
}