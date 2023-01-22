# Kontakt

<table>
    <tr>
        <td>E-Mail</td>
        <td><a href="mailto://maehrisch-wiesen@web.de">maehrisch-wiesen@web.de</a></td>
    </tr>
</table>

<hr>

<label>Ihre E-Mail</label>
<input type="email" id="name-in">
<br>
<label>Nachricht</label>
<br>
<textarea rows="8" cols="30" id="message-in"></textarea>
<br>
<button onclick="send()">senden</button>
<br><br><span id="feedback"></span>

<style>
    .kontakt-green-bg {
        background-color: #57c84a;
        padding: 5px 10px;
        margin-top: 30px;
    }
</style>

<script>

function send() {
    const email = document.getElementById("name-in").value;
    const message = document.getElementById("message-in").value;
    if (!(email === "" || message === "")) {
        const body = {
            "email": email,
            "message": message
        }
        spost("/notify/message", body);

        const feedback = document.getElementById("feedback");
        feedback.innerText = "Gesendet!";
        feedback.classList.add("kontakt-green-bg");
        setTimeout(reload, 2000);
    } else {
        alert("Bitte füllen Sie alle Felder aus!");
    }
}

function reload() {
    window.location.href = "/oth/kontakt";
}

</script>