app.service("ENTONGR", function(){

    if (Number.prototype.pad === undefined) {
        Number.prototype.pad = function(w) {
            var n = this.toString();
            while (n.length < w) n = '0' + n;
            return n;
        };
    }

    return function(e, n) {
        if (isNaN(e) || isNaN(n)) throw new Error('Invalid grid reference');

        // get the 100km-grid indices
        var e100k = Math.floor(e/100000), n100k = Math.floor(n/100000);

        if (e100k<0 || e100k>6 || n100k<0 || n100k>12) return '';

        // translate those into numeric equivalents of the grid letters
        var l1 = (19-n100k) - (19-n100k)%5 + Math.floor((e100k+10)/5);
        var l2 = (19-n100k)*5%25 + e100k%5;

        // compensate for skipped 'I' and build grid letter-pairs
        if (l1 > 7) l1++;
        if (l2 > 7) l2++;
        var letPair = String.fromCharCode(l1+'A'.charCodeAt(0), l2+'A'.charCodeAt(0));

        // strip 100km-grid indices from easting & northing, and reduce precision
        e = Math.floor((e%100000)/Math.pow(10, 5-6/2));
        n = Math.floor((n%100000)/Math.pow(10, 5-6/2));

        var gridRef = letPair + e.pad(3) + n.pad(3);

        return gridRef;
    }
  })
  .service("NGRTOEN", function(){

    return function NGR2NE(ngr){
        var e;
        var n;

        ngr = ngr.toUpperCase(ngr);

        //remove any spaces
        var bits = ngr.split(' ');
        ngr = "";
        for(var i=0;i<bits.length;i++)
            ngr+=bits[i];

        var c = ngr.charAt(0);
        if (c =='S'){
            e = 0;
            n = 0;
            }
        else if (c == 'T'){
            e = 500000;
            n = 0;
            }
        else if (c == 'N'){
            n = 500000;
            e = 0;
            }
        else if (c == 'O'){
            n = 500000;
            e = 500000;
            }
        else if(c == 'H'){
            n = 1000000;
            e = 0;
            }
        else
            return null;

        c = ngr.charAt(1);
        if(c == 'I')
            return null;

        c = ngr.charCodeAt(1) - 65;
        if(c > 8)
            c -= 1;
        e += (c % 5) * 100000;
        n += (4 - Math.floor(c/5)) * 100000;

        c = ngr.substr(2);
        if ((c.length%2) == 1)
            return null;
        if (c.length > 10)
            return null;

        try{
            var s = c.substr(0,c.length/2);
            while(s.length < 5)
                s += '0';
            e += parseInt(s,10);
            if(isNaN(e))
                return null;

            s = c.substr(c.length/2);
            while(s.length < 5)
                s += '0';
            n += parseInt(s,10);
            if(isNaN(n))
                return null;

            return {e,n};
        }
        catch (ex)
        {
            console.log(ex);
            return null;
        }

        }


  });
