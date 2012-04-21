if (typeof jQuery === 'undefined') {
    var j = document.createElement('SCRIPT');

    j.type = 'text/javascript';
    j.src = '//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(j);
    j.onload = function () {
        var $ = jQuery,
            section = document.createElement('DIV');

        console.log(jQuery);
        section.setAttribute('style', 'height:300px; width:250px; position: fixed; right: 0px; top: 100px;z-index: 9999; border-style:solid;border-width:1px;');
        section.innerHTML = '<p>steps</p><textarea name="steps"></textarea><p>expected results</p><textarea name="results"></textarea><p><input id="litmusTestSubmit" type="button" name="submit" value="add test case" /></p>';
        
        document.getElementsByTagName('body')[0].appendChild(section);
        
        $("#litmusTestSubmit").click(function () {
            var steps = $('textarea[name*="steps"]').val();
            var expectedResults = $('textarea[name*="results"]').val();
            $.post("http://localhost:3000/testcase/add", {steps: steps, expectedResults: expectedResults});
        });
    }
} else {
    var $ = jQuery,
        section = document.createElement('DIV');

    console.log(jQuery);
    section.setAttribute('style', 'height:300px; width:250px; position: fixed; right: 0px; top: 100px;z-index: 9999; border-style:solid;border-width:1px;');
    section.innerHTML = '<p>steps</p><textarea name="steps"></textarea><p>expected results</p><textarea name="results"></textarea><p><input id="litmusTestSubmit" type="button" name="submit" value="add test case" /></p>';
    
    document.getElementsByTagName('body')[0].appendChild(section);
    
    $("#litmusTestSubmit").click(function () {
        var steps = $('textarea[name*="steps"]').val();
        var expectedResults = $('textarea[name*="results"]').val();
        $.post("http://localhost:3000/testcase/add", {steps: steps, expectedResults: expectedResults});
    });
}
