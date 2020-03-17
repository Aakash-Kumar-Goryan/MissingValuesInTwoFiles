document.getElementById("my_form").addEventListener("submit", function (event) {
    event.preventDefault()
    console.log("Not Refreshed submission override");
    let myfile1 = document.getElementById('myfile1').files[0];
    let myfile2 = document.getElementById('myfile2').files[0];
    let read1 = new FileReader();
    let read2 = new FileReader();
    let res1;
    read1.onload = function () {
        res1 = read1.result;
        read2.readAsBinaryString(myfile2);
    }
    read1.readAsBinaryString(myfile1);
    read2.onload = function () {
        let res2 = read2.result, 
        set1 = new Set(res1.split("\n")), 
        set2 = new Set(res2.split("\n")),
        difference = new Set([...set1].filter(x => !set2.has(x))),
        fileoutput = "",
        output = `<table class="ui blue selectable table">
                    <thead>
                        <tr class="center aligned">
                            <th>Missing items in 2nd file</th>
                        </tr>
                    </thead>
                    <tbody>`;
        for (let item of difference) {
            output += `<tr class="center aligned"><td>${item}</td></tr>`;
            fileoutput += item + '\n'
        }
        output += `</tbody><tfoot><tr class="center aligned"><th><i class="attention icon"></i>${difference.size} missing numbers</th></tr></tfoot></table>`
        document.getElementById('container').innerHTML += `<a class="ui fluid blue button" id="myButton" href="#"><i class="download icon"></i> Save as text file</a>`;
        document.getElementById('container').innerHTML += output;
        document.getElementById('myButton').onclick = function (event) {
            let blob = new Blob([fileoutput], { type: "text/plain;charset=utf-8" });
            let blobUrl = window.URL.createObjectURL(blob);
            this.href = blobUrl;
            this.target = '_blank';
            // target filename
            this.download = 'file_compare_output.txt';
        }
    }
})