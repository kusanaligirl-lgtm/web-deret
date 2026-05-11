document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // Hide results when switching tabs
            document.querySelectorAll('.result-box').forEach(box => {
                box.classList.add('hidden');
            });
        });
    });

    // Format numbers properly (avoid long decimals)
    const formatNum = (num) => {
        return Number.isInteger(num) ? num : parseFloat(num.toFixed(4));
    };

    // Aritmatika Logic
    document.getElementById('form-aritmatika').addEventListener('submit', (e) => {
        e.preventDefault();
        const a = parseFloat(document.getElementById('a-arit').value);
        const b = parseFloat(document.getElementById('b-arit').value);
        const n = parseInt(document.getElementById('n-arit').value);

        if (isNaN(a) || isNaN(b) || isNaN(n)) return;

        const Un = a + (n - 1) * b;
        const Sn = (n / 2) * (2 * a + (n - 1) * b);

        const resultBox = document.getElementById('result-aritmatika');
        resultBox.innerHTML = `
            <div class="result-title">Hasil Perhitungan Deret Aritmatika</div>
            
            <div class="math-explanation">Mencari Suku ke-${n} (U<sub>${n}</sub>):</div>
            <div class="math-step">Rumus: U<sub>n</sub> = a + (n - 1)b</div>
            <div class="math-step">U<sub>${n}</sub> = ${a} + (${n} - 1) &times; ${b}</div>
            <div class="math-step">U<sub>${n}</sub> = ${a} + ${n - 1} &times; ${b}</div>
            <div class="math-step">U<sub>${n}</sub> = ${formatNum(Un)}</div>

            <div class="math-explanation">Mencari Jumlah ${n} Suku Pertama (S<sub>${n}</sub>):</div>
            <div class="math-step">Rumus: S<sub>n</sub> = (n/2) &times; (2a + (n - 1)b)</div>
            <div class="math-step">S<sub>${n}</sub> = (${n}/2) &times; (2(${a}) + (${n} - 1)${b})</div>
            <div class="math-step">S<sub>${n}</sub> = ${formatNum(n/2)} &times; (${formatNum(2*a)} + ${formatNum((n-1)*b)})</div>
            <div class="math-step">S<sub>${n}</sub> = ${formatNum(Sn)}</div>

            <div class="final-result">
                U<sub>${n}</sub> = ${formatNum(Un)} <br>
                S<sub>${n}</sub> = ${formatNum(Sn)}
            </div>
        `;
        resultBox.classList.remove('hidden');
    });

    // Geometri Logic
    document.getElementById('form-geometri').addEventListener('submit', (e) => {
        e.preventDefault();
        const a = parseFloat(document.getElementById('a-geo').value);
        const r = parseFloat(document.getElementById('r-geo').value);
        const n = parseInt(document.getElementById('n-geo').value);

        if (isNaN(a) || isNaN(r) || isNaN(n)) return;

        const Un = a * Math.pow(r, n - 1);
        let Sn;
        let snStep;

        if (r === 1) {
            Sn = a * n;
            snStep = `
                <div class="math-step">Karena r = 1, Rumus: S<sub>n</sub> = n &times; a</div>
                <div class="math-step">S<sub>${n}</sub> = ${n} &times; ${a}</div>
                <div class="math-step">S<sub>${n}</sub> = ${formatNum(Sn)}</div>
            `;
        } else {
            Sn = a * (Math.pow(r, n) - 1) / (r - 1);
            const rCond = r > 1 ? "r > 1" : "r < 1";
            const rFormula = r > 1 ? "a(r<sup>n</sup> - 1) / (r - 1)" : "a(1 - r<sup>n</sup>) / (1 - r)";
            snStep = `
                <div class="math-step">Karena ${rCond}, Rumus: S<sub>n</sub> = ${rFormula}</div>
                <div class="math-step">S<sub>${n}</sub> = ${a}(${r}<sup>${n}</sup> - 1) / (${r} - 1)</div>
                <div class="math-step">S<sub>${n}</sub> = ${a}(${formatNum(Math.pow(r,n))} - 1) / ${formatNum(r-1)}</div>
                <div class="math-step">S<sub>${n}</sub> = ${formatNum(Sn)}</div>
            `;
        }

        const resultBox = document.getElementById('result-geometri');
        resultBox.innerHTML = `
            <div class="result-title">Hasil Perhitungan Deret Geometri</div>
            
            <div class="math-explanation">Mencari Suku ke-${n} (U<sub>${n}</sub>):</div>
            <div class="math-step">Rumus: U<sub>n</sub> = a &times; r<sup>n-1</sup></div>
            <div class="math-step">U<sub>${n}</sub> = ${a} &times; ${r}<sup>${n}-1</sup></div>
            <div class="math-step">U<sub>${n}</sub> = ${a} &times; ${formatNum(Math.pow(r, n-1))}</div>
            <div class="math-step">U<sub>${n}</sub> = ${formatNum(Un)}</div>

            <div class="math-explanation">Mencari Jumlah ${n} Suku Pertama (S<sub>${n}</sub>):</div>
            ${snStep}

            <div class="final-result">
                U<sub>${n}</sub> = ${formatNum(Un)} <br>
                S<sub>${n}</sub> = ${formatNum(Sn)}
            </div>
        `;
        resultBox.classList.remove('hidden');
    });

    // Pangkat Logic
    document.getElementById('form-pangkat').addEventListener('submit', (e) => {
        e.preventDefault();
        const n = parseInt(document.getElementById('n-pang').value);
        let c = parseFloat(document.getElementById('c-pang').value);
        if (isNaN(c)) c = 1; // Default ke 1 jika kosong atau tidak valid
        const k = parseInt(document.getElementById('k-pang').value);

        if (isNaN(n) || isNaN(k)) return;

        let baseSum = 0;
        let sum = 0;
        let stepsHTML = '';
        const cStr = c === 1 ? "" : `${c} &times; `;
        const cText = c === 1 ? "" : `${c}`;
        
        if (k === 1) {
            baseSum = (n * (n + 1)) / 2;
            sum = c * baseSum;
            stepsHTML = `
                <div class="math-explanation">Jumlah deret bilangan asli (Pangkat 1):</div>
                <div class="math-step">Deret: ${cText}(1) + ${cText}(2) + ${cText}(3) + ... + ${cText}(${n})</div>
                <div class="math-step">Rumus: &sum; c &times; i = c &times; [n(n + 1) / 2]</div>
                <div class="math-step">&sum; = ${cStr}[${n}(${n} + 1) / 2]</div>
                <div class="math-step">&sum; = ${cStr}[${n}(${n + 1}) / 2]</div>
                ${c !== 1 ? `<div class="math-step">&sum; = ${c} &times; ${formatNum(baseSum)}</div>` : ''}
                <div class="math-step">&sum; = ${formatNum(sum)}</div>
            `;
        } else if (k === 2) {
            baseSum = (n * (n + 1) * (2 * n + 1)) / 6;
            sum = c * baseSum;
            stepsHTML = `
                <div class="math-explanation">Jumlah kuadrat bilangan asli (Pangkat 2):</div>
                <div class="math-step">Deret: ${cText}(1²) + ${cText}(2²) + ${cText}(3²) + ... + ${cText}(${n}²)</div>
                <div class="math-step">Rumus: &sum; c &times; i² = c &times; [n(n + 1)(2n + 1) / 6]</div>
                <div class="math-step">&sum; = ${cStr}[${n}(${n} + 1)(2(${n}) + 1) / 6]</div>
                <div class="math-step">&sum; = ${cStr}[${n}(${n + 1})(${2 * n + 1}) / 6]</div>
                ${c !== 1 ? `<div class="math-step">&sum; = ${c} &times; ${formatNum(baseSum)}</div>` : ''}
                <div class="math-step">&sum; = ${formatNum(sum)}</div>
            `;
        } else if (k === 3) {
            const base = (n * (n + 1)) / 2;
            baseSum = Math.pow(base, 2);
            sum = c * baseSum;
            stepsHTML = `
                <div class="math-explanation">Jumlah kubik bilangan asli (Pangkat 3):</div>
                <div class="math-step">Deret: ${cText}(1³) + ${cText}(2³) + ${cText}(3³) + ... + ${cText}(${n}³)</div>
                <div class="math-step">Rumus: &sum; c &times; i³ = c &times; [n(n + 1) / 2]²</div>
                <div class="math-step">&sum; = ${cStr}[${n}(${n} + 1) / 2]²</div>
                <div class="math-step">&sum; = ${cStr}[${n}(${n + 1}) / 2]²</div>
                <div class="math-step">&sum; = ${cStr}[${base}]²</div>
                ${c !== 1 ? `<div class="math-step">&sum; = ${c} &times; ${formatNum(baseSum)}</div>` : ''}
                <div class="math-step">&sum; = ${formatNum(sum)}</div>
            `;
        }

        const resultBox = document.getElementById('result-pangkat');
        resultBox.innerHTML = `
            <div class="result-title">Hasil Perhitungan Deret Pangkat ${k} (Koefisien: ${c})</div>
            ${stepsHTML}
            <div class="final-result">
                Total Jumlah = ${formatNum(sum)}
            </div>
        `;
        resultBox.classList.remove('hidden');
    });

    // Sigma Dinamis Logic
    const dynamicTermsContainer = document.getElementById('dynamic-terms');
    const btnAddTerm = document.getElementById('btn-add-term');
    let termCount = 0;

    const createTermHTML = (id, defaultC = 1, defaultK = 1) => `
        <div class="input-group" id="term-${id}" style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 12px; border: 1px solid var(--glass-border); display: grid; grid-template-columns: 1fr 1fr auto; gap: 1rem; align-items: end;">
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <label style="font-size: 0.85rem;">Koefisien (c)</label>
                <input type="number" step="any" class="term-c" value="${defaultC}" required style="padding: 0.6rem; border-radius: 8px;">
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <label style="font-size: 0.85rem;">Pangkat (k)</label>
                <select class="term-k" required style="padding: 0.6rem; border-radius: 8px;">
                    <option value="0" ${defaultK === 0 ? 'selected' : ''}>Pangkat 0 (Konstanta)</option>
                    <option value="1" ${defaultK === 1 ? 'selected' : ''}>Pangkat 1 (A)</option>
                    <option value="2" ${defaultK === 2 ? 'selected' : ''}>Pangkat 2 (A²)</option>
                    <option value="3" ${defaultK === 3 ? 'selected' : ''}>Pangkat 3 (A³)</option>
                </select>
            </div>
            <button type="button" class="btn-remove-term" data-id="${id}" style="background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); padding: 0.6rem 1rem; border-radius: 8px; cursor: pointer; transition: all 0.2s;">X</button>
        </div>
    `;

    // Add default term
    const addTerm = (c, k) => {
        termCount++;
        dynamicTermsContainer.insertAdjacentHTML('beforeend', createTermHTML(termCount, c, k));
        
        const removeBtn = document.querySelector(`.btn-remove-term[data-id="${termCount}"]`);
        removeBtn.addEventListener('click', function() {
            document.getElementById(`term-${this.getAttribute('data-id')}`).remove();
        });
    };
    
    // Inisialisasi default dengan 2A + A^3 (seperti soal)
    addTerm(2, 1);
    addTerm(1, 3);

    btnAddTerm.addEventListener('click', () => addTerm(1, 1));

    const calculateSumUpToN = (n, k, c) => {
        if (n <= 0) return 0;
        let baseSum = 0;
        if (k === 0) baseSum = n;
        else if (k === 1) baseSum = (n * (n + 1)) / 2;
        else if (k === 2) baseSum = (n * (n + 1) * (2 * n + 1)) / 6;
        else if (k === 3) baseSum = Math.pow((n * (n + 1)) / 2, 2);
        return c * baseSum;
    };

    document.getElementById('form-sigma').addEventListener('submit', (e) => {
        e.preventDefault();
        const start = parseInt(document.getElementById('start-sigma').value);
        const end = parseInt(document.getElementById('end-sigma').value);
        
        if (isNaN(start) || isNaN(end) || start > end) {
            alert("Batas tidak valid. Pastikan Batas Bawah <= Batas Atas.");
            return;
        }

        const terms = [];
        document.querySelectorAll('#dynamic-terms .input-group').forEach(el => {
            let c = parseFloat(el.querySelector('.term-c').value);
            if (isNaN(c)) c = 1;
            const k = parseInt(el.querySelector('.term-k').value);
            terms.push({ c, k });
        });

        if (terms.length === 0) {
            alert("Tambahkan minimal 1 suku.");
            return;
        }

        let totalSum = 0;
        let stepsHTML = '';

        terms.forEach((term, index) => {
            const { c, k } = term;
            const sumEnd = calculateSumUpToN(end, k, c);
            const sumStartMinus1 = calculateSumUpToN(start - 1, k, c);
            const termSum = sumEnd - sumStartMinus1;
            totalSum += termSum;

            const A_str = k === 0 ? "1" : (k === 1 ? "A" : `A<sup>${k}</sup>`);
            const cStr = (c === 1 && k !== 0) ? "" : `${c}`;
            const eqStr = (c === 1 && k === 0) ? "1" : `${cStr}${A_str}`;
            
            stepsHTML += `
                <div class="math-explanation">Menghitung Suku ${index + 1}: &sum; ${eqStr} dari A=${start} sampai ${end}</div>
            `;
            
            if (start > 1) {
                stepsHTML += `
                    <div class="math-step">Nilai pada Batas Atas (1 sampai ${end}): ${formatNum(sumEnd)}</div>
                    <div class="math-step">Nilai sebelum Batas Bawah (1 sampai ${start - 1}): ${formatNum(sumStartMinus1)}</div>
                    <div class="math-step">Hasil Suku ${index + 1} = ${formatNum(sumEnd)} - ${formatNum(sumStartMinus1)} = ${formatNum(termSum)}</div>
                `;
            } else {
                stepsHTML += `
                    <div class="math-step">Hasil Suku ${index + 1} (1 sampai ${end}) = ${formatNum(termSum)}</div>
                `;
            }
        });

        const resultBox = document.getElementById('result-sigma');
        resultBox.innerHTML = `
            <div class="result-title">Hasil Perhitungan Sigma Dinamis</div>
            <div class="math-explanation" style="font-size: 1.05rem; color: var(--primary-color);">Total Penjumlahan = Penjumlahan semua suku</div>
            ${stepsHTML}
            <div class="final-result" style="margin-top: 1rem;">
                Total Keseluruhan = ${formatNum(totalSum)}
            </div>
        `;
        resultBox.classList.remove('hidden');
    });
});
