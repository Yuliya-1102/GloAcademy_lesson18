class Validator{
    constructor({selector, pattern = {}, method}){
        this.form = document.querySelector(selector);

        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
            item.type !== 'button';
        });
        this.error = new Set();
    }

    init(){
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt.bind(this))); //elem передается всем м-дам 
        this.form.addEventListener('submit', e => {
            this.elementsForm.forEach(elem => this.chekIt({target: elem}));
            if(this.error.size){ //имееет длинну
                e.preventDefault();
            } 
        });   
    }

    isValid(elem){
        const validatorMethod = {
            notEmpty(elem){
                if(elem.value.trim() ===''){
                    return false;
                }
                return true;
            },
            pattern(elem, pattern){
                return pattern.test(elem.value);
            }
        };
        if(this.method){
            const method = this.method[elem.id]; // определили где change и какой именно метод "phone" или 'email' 
    
            if(method){
                return method.every(item => { //перебираем массив method "phone"
                    return validatorMethod[item[0]](elem, this.pattern[item[1]]);
                });
            }
        } else{
            console.warn('Передать id полнй ввода и методы проверки этих полей');
        }
    
        return true;
    }

    chekIt(event){
        const target = event.target;

        if (this.isValid(target)){
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showErrore(target);
            this.error.add(target); //при вводе неверные данные, записываются в Set()
        }
    }

    showErrore(elem){
        elem.classList.remove('success');
        elem.classList.add('error');
        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem){
        elem.classList.remove('error');
        elem.classList.add('success');
        console.log(elem);
        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            elem.nextElementSibling.remove();
        }
    }

    applyStyle(){
        const style = document.createElement('style');
        style.textContent = `
            input.success {
                border: 2px solid green;
            }
            input.error {
                border: 2px solid red;
            }
            .validator-error {
                font-size: 12px;
                font-family: sans-serif;
                color: red;
            }
        `;
        document.head.appendChild(style);
    }

    setPattern(){
        if(!this.pattern.phone){ // приоритет паттерна пользователя
            this.pattern.phone = /^\+?[7,8]([-()]*\d){10}$/;
        }
        if(!this.pattern.email){
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }
        if(!this.pattern.name){
            this.pattern.name = /^([а-я])+$/i;
        }

    }   
}