/**
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * This software consists of voluntary contributions made by many individuals
 * and is licensed under the new BSD license.
 *
 * @author      DragonOfMercy <dragonofmercy@gmail.com>
 * @license     http://www.opensource.org/licenses/BSD-3-Clause New BSD license
 * @version     1.1
 */
(function($){

    $.barcodeListener = function(context, options){

        var $defaults = {
            support: [8, 12, 13]
        };

        var $this = this;
        $this.element = $(context);
        $this.timeout = 0;
        $this.code = '';
        $this.settings = {};

        $this.init = function(){
            $this.settings = $.extend({}, $defaults, options);
            $this.element.on('keypress', function(e){
                $this.listen(e);
            })
        };

        $this.listen = function(e){
            var $char = $this.validateKey(e.which);
            if($char === 13){
                $this.validate();
            } else if($char !== false) {
                if($this.code == ''){
                    setTimeout($this.clear(), 1000);
                }
                $this.add($char);
            }
        };

        $this.validate = function(){
            var $tmp = $this.code;
            if($this.settings.support.indexOf($tmp.length) > -1){
                var $d = new Date(),
                    $interval = $d.getTime() - $this.timeout;
                $this.clear();
                if($interval < 1000){
                    $this.element.trigger('barcode.valid', [$tmp]);
                }
            } else {
                $this.clear();
            }
        };

        $this.clear = function(){
            $this.code = '';
            $this.timeout = 0;
        };

        $this.validateKey = function(keycode){
            if(keycode == 13 || (keycode >= 48 && keycode <= 57)){
                if(keycode == 13){
                    return keycode;
                } else {
                    return String.fromCharCode(keycode);
                }
            } else {
                return false;
            }
        };

        $this.add = function(char){
            if($this.timeout === 0){
                var $d = new Date();
                $this.timeout = $d.getTime();
            }
            $this.code += char;
        };

        $this.init();
    };

    $.fn.barcodeListener = function(options) {

        return this.each(function(){
            if(undefined == $(this).data('barcodeListener')){
                var plugin = new $.barcodeListener(this, options);
                $(this).data('barcodeListener', plugin);
            }
        });

    }

})(jQuery);