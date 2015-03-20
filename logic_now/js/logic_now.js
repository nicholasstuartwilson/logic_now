Drupal.behaviors.logic_now = {
  attach: function (context, settings) {
    jQuery(document).ready(function () {
      var radios_clicked = [];

      jQuery('#edit-check').click(function(e){
        var check = checkcontrols();
        if(check.length != 0){
          var confirm_message = 'Incomplete fields:\n' + check + '\n\n' + "Proceed anyway?";
          if (confirm(confirm_message)){
            return true;
          }else{
            e.preventDefault();
          }
        }

      });

      function checkcontrols(){
        var incomplete = '';
        jQuery('.required').each(function(index, value) {
          if(jQuery(this).attr('type') == 'checkbox'){
            if(!jQuery(this).is(':checked')){
              incomplete += jQuery(this).attr('name') + '\n';
            }
          }
          if (this.value.length == 0){
            incomplete += jQuery(this).attr('name') + '\n';
          }
        });

        jQuery('.form-radios').each(function(index, value) {
          if(jQuery.inArray(jQuery(this).attr('id'), radios_clicked)!== -1){
            //alert('found ' + jQuery(this).attr('id') + ' in the radios_clicked array');
          }else{
            incomplete += jQuery(this).attr('id') + '\n';
          }
        });

        return incomplete;
      }

      jQuery(".form-radio").click(function() {
        var n = jQuery(this).attr('id').lastIndexOf('-');
        // store the radio group name to check if an option was selected
        var controlname = jQuery(this).attr('id').substr(0, n);
        radios_clicked.push(controlname);
      });

    });

  }
};