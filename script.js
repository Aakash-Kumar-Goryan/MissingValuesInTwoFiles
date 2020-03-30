document.getElementById("my_form").addEventListener("submit", function (event) {
    event.preventDefault()
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
            difference1 = new Set([...set2].filter(x => !set1.has(x))),
            difference2 = new Set([...set1].filter(x => !set2.has(x))),
            fileoutput1 = "",
            fileoutput2 = "",
            output = `<table class="ui unstackable blue selectable celled table">
                        <thead>
                            <tr class="center aligned">
                                <th>Missing in 1st file</th>
                                <th>Missing in 2nd file</th>
                            </tr>
                        </thead>
                        <tbody>`;
        let Adiff1 = Array.from(difference1),
            Adiff2 = Array.from(difference2);
        for (let i = 0; i < Math.max(Adiff1.length, Adiff2.length); i++) {
            if (i < Math.min(Adiff1.length, Adiff2.length)) {
                output += `<tr class="center aligned"><td>${Adiff1[i]}</td><td>${Adiff2[i]}</td></tr>`;
                fileoutput1 += Adiff1[i] + '\n'
                fileoutput2 += Adiff2[i] + '\n'
            }
            else if (i >= Adiff1.length) {
                output += `<tr class="center aligned"><td></td><td>${Adiff2[i]}</td></tr>`;
                fileoutput2 += Adiff2[i] + '\n'
            } else {
                output += `<tr class="center aligned"><td>${Adiff1[i]}</td><td></td></tr>`;
                fileoutput1 += Adiff1[i] + '\n'
            }
        }
        output += ` </tbody><tfoot>
                        <tr class="center aligned">
                            <th><i class="attention icon"></i>${difference1.size} missing numbers</th>
                            <th><i class="attention icon"></i>${difference2.size} missing numbers</th>
                        </tr>
                    </tfoot></table>`;
        document.getElementById('container').innerHTML = ` <div class="ui fluid buttons">
                                                                <a class="ui blue attached button" id="myButton1" href="#">
                                                                    <i class="download icon"></i> Save as text file
                                                                </a>
                                                                <a class="ui blue attached ui button" id="myButton2" href="#">
                                                                    <i class="download icon"></i> Save as text file
                                                                </a>
                                                            </div>`;
        document.getElementById('container').innerHTML += output;
        document.getElementById('myButton1').onclick = function (event) {
            let blob = new Blob([fileoutput1], { type: "text/plain;charset=utf-8" });
            let blobUrl = window.URL.createObjectURL(blob);
            this.href = blobUrl;
            this.target = '_blank';
            // target filename
            this.download = 'file_compare_output1.txt';
        }
        document.getElementById('myButton2').onclick = function (event) {
            let blob = new Blob([fileoutput2], { type: "text/plain;charset=utf-8" });
            let blobUrl = window.URL.createObjectURL(blob);
            this.href = blobUrl;
            this.target = '_blank';
            // target filename
            this.download = 'file_compare_output2.txt';
        }
    }
})