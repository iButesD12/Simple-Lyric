const display = document.getElementById("display");
    const history = document.getElementById("history");

    function tambah(nilai){
      display.value += nilai;
    }

    function clearDisplay(){
      display.value = "";
      history.innerHTML = "&nbsp;";
    }

    function hapus(){
      display.value = display.value.slice(0, -1);
    }

    function toggleSign(){
      const match = display.value.match(/(\d+\.?\d*)$/);
      if(!match) return;
      const num = match[1];
      const start = match.index;
      const before = display.value.slice(0, start);

      if(before.endsWith('-') && /(^|[+\-*/(])$/.test(before.slice(0, -1))){
        display.value = before.slice(0, -1) + num;
      } else {
        display.value = before + '-' + num;
      }
    }

    function hitung(){
      const ekspresi = display.value;
      if(!ekspresi) return;
      try{

        const aman = ekspresi.replace(/%/g, '/100');
        const hasil = Function('"use strict"; return (' + aman + ')')();
        history.textContent = ekspresi + " =";
        display.value = Number.isFinite(hasil) ? parseFloat(hasil.toFixed(10)) : "Error";
      }catch{
        display.value = "Error";
      }
      display.classList.remove('pop');
      void display.offsetWidth; // restart animasi
      display.classList.add('pop');
    }

    window.addEventListener('keydown', (e) => {
      const tombolAngkaOperator = '0123456789+-*/.%()';
      if (tombolAngkaOperator.includes(e.key)){
        e.preventDefault();
        tambah(e.key);
      } else if (e.key === 'Enter' || e.key === '='){
        e.preventDefault();
        hitung();
      } else if (e.key === 'Backspace'){
        e.preventDefault();
        hapus();
      } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c'){
        e.preventDefault();
        clearDisplay();
      }
    });

    (function buatBintang(){
      const container = document.getElementById('starfield');
      const jumlah = 90;
      for(let i = 0; i < jumlah; i++){
        const bintang = document.createElement('div');
        bintang.className = 'star';
        bintang.style.setProperty('--x', Math.random() * 100 + '%');
        bintang.style.setProperty('--y', Math.random() * 100 + '%');
        bintang.style.setProperty('--s', (Math.random() * 2 + 1).toFixed(1) + 'px');
        bintang.style.setProperty('--dur', (Math.random() * 4 + 3).toFixed(1) + 's');
        bintang.style.setProperty('--delay', (Math.random() * 5).toFixed(1) + 's');
        container.appendChild(bintang);
      }
    })();