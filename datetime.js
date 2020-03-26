function parse_datetime_format(format, timestamp) {
    var date, output = "",
        i, current, last;
    date = new Date(timestamp * 1000);

    function pad(number) {
        return number < 10 ? "0" + number : number;
    }
    for (i = 0; i < format.length; i += 1) {
        current = format[i];
        if (last === "\\") {
            output += current;
        } else if (current === "Y") {
            output += date.getFullYear();
        } else if (current === "m") {
            output += pad(date.getMonth() + 1);
        } else if (current === "d") {
            output += pad(date.getDate());
        } else if (current === "H") {
            output += pad(date.getHours());
        } else if (current === "i") {
            output += pad(date.getMinutes());
        } else if (current === "s") {
            output += pad(date.getSeconds());
        } else if (current === "y") {
            output += pad(date.getYear() % 100);
        } else if (current === "h") {
            output += pad(date.getHours() % 12);
        } else if (current === "j") {
            output += date.getDate();
        } else if (current === "r") {
            output += date.toUTCString();
        } else if (current === "G") {
            output += date.getHours();
        } else if (current === "g") {
            output += date.getHours() % 12;
        } else if (current === "a") {
            output += date.getHours() < 12 ? "am" : "pm";
        } else if (current === "M") {
            output += ["Jan", "Feb", "Ma", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"][date.getMonth()];
        } else if (current === "F") {
            output += ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()];
        } else if (current === "S") {
            output += ((date.getDate() === 1 || date.getDate() === 21 || date.getDate() === 31) ? "st" : ((date.getDate() === 2 || date.getDate() === 22) ? "nd" : ((date.getDate() === 3 || date.getDate() === 23) ? "rd" : "th")));
        } else if (current === "\\") {} else {
            output += current;
        }
        last = current;
    }
    return output;
}
if (window.$) {
    $(document).ready(function() {
        $(".datetime").each(function(i, o) {
            var timestamp, format;
            o = $(o);
            timestamp = $(o).data("timestamp");
            format = $(o).data("format");
            $(o).html(parse_datetime_format(format, timestamp));
        });
    });
}