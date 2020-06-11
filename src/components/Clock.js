import React, { Component } from "react";

 class Clock extends Component{
    constructor(props){
        super(props)

        this.timer = 0
        this.birthday = props.BirthDayFormState.startDate.toString();

        this.getTimeRemaining=this.getTimeRemaining.bind(this);
        this.noBirthYear = new Date (this.birthday).getFullYear() == new Date().getFullYear()

        this.state ={
            timeRemaining:this.getTimeRemaining(this.props.BirthDayFormState.startDate.toString())
        }

    }

    componentWillReceiveProps(nextProps) {
        console.log(`next page: ${JSON.stringify(nextProps)}`)

    }

    getTimeRemaining(birthday) {

        var bday =new Date(birthday);
        let today = new Date();

        const currentMonth = today.getMonth();
        const birthdayMonth = bday.getMonth();


        if(birthdayMonth > currentMonth){
             //1 month is after the cureent month

            bday.setFullYear(today.getFullYear());

        }
         else if (birthdayMonth < currentMonth){
            //2 month is before the second month

        bday.setFullYear(today.getFullYear() + 1);

        }
        else if (birthdayMonth == currentMonth) {
            const birthDay = bday.getDate();
            const CurrentDay = today.getDate();
            if(birthDay > CurrentDay){
                //1 month is after the cureent month
   
               bday.setFullYear(today.getFullYear());
   
           }
            else if (birthDay < CurrentDay){
               //2 month is before the second month
   
           bday.setFullYear(today.getFullYear() + 1);
   
           }else if(birthDay == CurrentDay) {
               return 0

           }
        }

        var distance = bday.getTime() - today.getTime();

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        return ({
            "days": days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        })

    }

    getAge = function(){
        var bday = new Date(this.birthday);
        let today = new Date();


        var distance =  today.getTime() - bday.getTime();
        var daysOld = Math.floor(distance / (1000 * 60 * 60 * 24));
        var yearsOld =Number((daysOld/360).toFixed(0));


        return yearsOld

    }.bind(this)


    componentDidMount() {
        if(this.timer == 0){
            this.timer = setInterval(() => {
                const timeRemaining =this.getTimeRemaining(this.birthday)
                this.setState({timeRemaining: timeRemaining})
            }, 1000);
        }

    }

    componentWillUnmount() {
        console.log('trying to unmount component');
        clearInterval(this.timer);
    }

    renderMessage(){
        if(this.noBirthYear) {
            return (
                <h4>untill your birthDay!</h4>
            )
        }
        return (
            <h4>remaining until you are {this.getAge()}</h4>
        )
    }

        

    render(){
        const data = this.state.timeRemaining
        return(
            <div className='countdown'>
                {
                    this.state.timeRemaining == 0 ?
                        <div className='message-container'>
                            <P className='message-container-title'>countdown Complete</P>
                            <P className='message-container-message'>Happy birthDay</P>

                        </div>

                        :
                 <div>
                     <div>
                <ul className='countdown-clock'>

                <li>DAYS <p>{data.days}</p></li>
                <li>HRS <p>{data.hours}</p></li>
                <li>MINS  <p>{data.minutes}</p></li>
                <li>Secs  <p>{data.seconds}</p></li>

                </ul>

                </div>
                <div>
                 {this.renderMessage()}
                  </div>


                    </div>
                }
            </div>
        )
    }


}

export default Clock;