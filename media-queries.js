if (typeof (jQuery) != 'undefined')
{
    // Polyfill media queries for old browsers with JavaScript enabled
    if (!Modernizr.mq('only screen and (min-width: 474px)'))
    {
        // If you just remove the media attribute from a stylesheet that wasn't loaded, it doesn't get loaded (tested in Firefox 2).
        // Instead, insert a new <link /> element without all the same attributes *except* media, and that gets applied.
        // Replace the original media attribute with "screen" so that only the mobile stylesheet is used for printing.
        $("link[media]", "head").each(function () {
            var link = document.createElement('link');
            link.rel = this.rel;
            link.type = this.type;
            link.href = this.href;
            link.media = "screen";
            link.className = "js" + this.className;
            this.parentNode.insertBefore(link, this);
        });

        // Target the newly inserted <link /> elements, enabling or disabling depending on browser width
        var mqMedium = $("link.jsmqMedium", "head");
        function applyMedium() { mqMedium.each(function() { this.disabled = document.documentElement.offsetWidth < 474; }); }
        $(window).resize(applyMedium);
        applyMedium();

        var mqLarge = $("link.jsmqLarge", "head");
        function applyLarge() { mqLarge.each(function() { this.disabled = document.documentElement.offsetWidth < 802; }); }
        $(window).resize(applyLarge);
        applyLarge();
    }
}