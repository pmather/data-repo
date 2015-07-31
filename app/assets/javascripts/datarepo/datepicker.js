var datepickerClass = '.datarepo-datepicker';
var datepickerNumber = 0;
var datepickerOpts = {
    changeMonth: true,
    changeYear: true,
    yearRange: '-70:-0'
};

function addDatepicker(mutation) {
    for (var i = 0; i < mutation.addedNodes.length; ++i) {
        var node = $(mutation.addedNodes[i]).find('input').first();
        if (node.length && !node.data('datepicker')) {
            node.removeClass('hasDatepicker');
            if (node.attr('id').endsWith('-' + datepickerNumber)) {
                node.attr('id', node.attr('id').slice(0, 0-('-' + datepickerNumber).length));
                ++datepickerNumber;
            }
            node.attr('id', node.attr('id') + '-' + datepickerNumber);
            node.datepicker();
        }
    }
}

Blacklight.onLoad(function() {
    if ($(datepickerClass).length) {
        $.datepicker.setDefaults(datepickerOpts);
        $(datepickerClass).each(function() {
            $(this).datepicker();

            var datepickerObserver = new MutationObserver(function(mutations) {
                mutations.forEach(addDatepicker);
            });
            datepickerObserver.observe($(this).closest('div')[0], {subtree: true, childList: true});
        });
    }
});
