const countdown = () => {
    const countDate = new Date('December 28, 2021 23:11:30').getTime()
    const now = new Date().getTime();
    const timeDifference = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(timeDifference / day);
    const textHour = Math.floor(timeDifference % day / hour)
    const textMinute = Math.floor(timeDifference % hour / minute);
    const textSecond = Math.floor(timeDifference % minute / second);

    const _day = document.querySelector('.days').innerText = textDay;
    const _hour = document.querySelector('.hours').innerText = textHour;
    const _minute = document.querySelector('.minutes').innerText = textMinute;
    const _second = document.querySelector('.seconds').innerText = textSecond;

}

setInterval(countdown, 1000);