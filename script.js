document.getElementById("my_form").addEventListener("submit", function (event) {
    event.preventDefault()
    console.log("Not Refreshed submission override");
    let myfile1 = document.getElementById('myfile1').files[0];
    let myfile2 = document.getElementById('myfile2').files[0];

    let output = [];
    // output.push('<li><strong>', escape(myfile1.name), '</strong> (', myfile1.type || 'n/a', ') - ',
    //     myfile1.size, ' bytes, last modified: ',
    //     myfile1.lastModifiedDate ? myfile1.lastModifiedDate.toLocaleDateString() : 'n/a',
    //     '</li>');
    // output.push('<li><strong>', escape(myfile2.name), '</strong> (', myfile2.type || 'n/a', ') - ',
    //     myfile2.size, ' bytes, last modified: ',
    //     myfile2.lastModifiedDate ? myfile2.lastModifiedDate.toLocaleDateString() : 'n/a',
    //     '</li>');

    let read1 = new FileReader();
    let read2 = new FileReader();
    let res1;
    read1.onload = function () {
        res1 = read1.result;
        read2.readAsBinaryString(myfile2);
    }
    read1.readAsBinaryString(myfile1);
    read2.onload = function () {
        let res2 = read2.result
        let set1 = new Set(res1.split("\n"));
        let set2 = new Set(res2.split("\n"));
        console.log(set1);
        console.log(set2);
        let difference = new Set([...set1].filter(x => !set2.has(x)));
        console.log(difference);
        for(let item of difference)
        {
            output.push(`<li>${item}</li>`);
            document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
        }
    }
})