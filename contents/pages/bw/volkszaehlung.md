# Volkszählung Böhmisch Wiesens

Hier die Volkszählung von Böhmisch Wiesen 1938 (UNVOLLSTÄNDIG - IN ARBEIT):

<table id="volksz-table" class="t"></table>

<button onclick="download()" class="button">DOWNLOAD</button>

<script>

    let data = JSON.parse(sync("get", "/tables/volksz-bw.csv", null));
    let tableElement = document.getElementById("volksz-table");
    rowLength = data[0].length;
    for (let row of data) {
        let rowElement = document.createElement("tr");
        let fields = 0;
        for (field of row) {
            let fieldElement = document.createElement("td");
            fieldElement.innerText = field;
            rowElement.appendChild(fieldElement);
            fields++;
        }
        while (fields < rowLength) {
            rowElement.appendChild(document.createElement("td"));
            fields++;
        }
        tableElement.appendChild(rowElement);
    }

    function download() {
        window.location.href = "/tables/volksz-bw.ods/download";
    }

</script>