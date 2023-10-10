// Timer for 24h

const timerElement = document.getElementById('timer');
        const fillerElement = document.getElementById('filler');
        const progressBar = document.getElementById('progress-bar');
        const totalSeconds = 24 * 60 * 60; // 24 hours in seconds
        let remainingSeconds = totalSeconds;

        function updateTimer() {
            const now = new Date();
            const timeZoneOffset = now.getTimezoneOffset() * 60;
            const localTimeInSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
            remainingSeconds = totalSeconds - timeZoneOffset - localTimeInSeconds;

            if (remainingSeconds <= 0) {
                timerElement.innerText = "00:00:00";
                fillerElement.style.width = "100%";
                return;
            }

            const hours = Math.floor(remainingSeconds / 3600);
            const minutes = Math.floor((remainingSeconds % 3600) / 60);
            const seconds = remainingSeconds % 60;

            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            timerElement.innerText = formattedTime;

            const progressBarWidth = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
            fillerElement.style.width = `${progressBarWidth}%`;

            setTimeout(updateTimer, 1000);
        }

        updateTimer();