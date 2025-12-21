$( '#mob-trigger' ).click ( function () {

            $( '#mob-trigger' ).addClass( 'open' );
            $( 'body' ).append( '<div class="menu-bg-cover"><div class="menu-container"></div></div><div class="overlayW"></div>' );

            $( '.screen-nav' ).clone().appendTo( '.menu-container' ).removeClass( 'screen-nav' ).addClass( 'mobi-nav' );

            setTimeout( function() {

                $( '.menu-container' ).addClass( 'in' );
                $( '.overlayW' ).addClass( 'active' );

            }, 100 );

            $( '.menu-bg-cover' ).click( function () {

              $( '.menu-container' ).removeClass( 'in' ).addClass( 'out' );
              $( '#mob-trigger' ).removeClass( 'open' );

              setTimeout( function () {

                  $( '.menu-bg-cover' ).remove();
                  $( '.overlayW' ).remove();

              }, 1000 );

            });
        });