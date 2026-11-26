
/* WEBHUB PRO · PAYMENT METHODS FOOTER
   Archivo externo para la web generada.
   Requiere un elemento con id="wh-payment-methods".
*/
(function () {
  "use strict";

  function mountPaymentFooter() {
    const mount = document.getElementById("wh-payment-methods");

    if (!mount || mount.dataset.paymentMounted === "true") return;

    mount.dataset.paymentMounted = "true";

    const html = String.raw`
<!-- PAYMENT METHODS UI · PREMIUM CLEAN FINAL -->
<section class="payment-ui">

<style>
.payment-ui {
  --pm-border:#252a3c;
  --pm-text:#f5f6fb;
  --pm-muted:#9ba4ba;
  --pm-accent:#32e6a0;
  width:100%;
  box-sizing:border-box;
  padding:24px;
  border:1px solid var(--pm-border);
  border-radius:22px;
  background:linear-gradient(145deg,#10131e,#090b12);
  color:var(--pm-text);
  font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  overflow:hidden;
}
.payment-ui *, .payment-ui *::before, .payment-ui *::after {
  box-sizing:border-box;
}
.payment-ui .pm-header {
  display:flex;
  align-items:center;
  gap:18px;
  margin-bottom:25px;
}
.payment-ui .pm-main-icon {
  width:62px;
  height:62px;
  flex-shrink:0;
  display:grid;
  place-items:center;
  border-radius:17px;
  color:white;
  background:linear-gradient(135deg,#6335ed,#173cdb);
  box-shadow:0 8px 28px #3825c544;
}
.payment-ui .pm-main-icon svg {
  width:30px;
  height:30px;
}
.payment-ui .pm-heading {
  min-width:0;
}
.payment-ui .pm-heading h2 {
  margin:0;
  font-size:clamp(22px,3vw,30px);
  line-height:1.2;
  font-weight:750;
  letter-spacing:-1px;
  color:var(--pm-text);
}
.payment-ui .pm-heading p {
  margin:7px 0 0;
  color:var(--pm-muted);
  font-size:14px;
  line-height:1.5;
}
.payment-ui .pm-secure-badge {
  margin-left:auto;
  flex-shrink:0;
  display:flex;
  align-items:center;
  gap:8px;
  padding:10px 15px;
  border:1px solid #17694e;
  border-radius:40px;
  background:#0b251e;
  color:var(--pm-accent);
  font-size:12px;
  font-weight:700;
  white-space:nowrap;
}
.payment-ui .pm-secure-badge svg {
  width:19px;
  height:19px;
}
.payment-ui .pm-groups {
  display:grid;
  grid-template-columns:1.12fr .92fr 1.05fr;
  gap:14px;
}
.payment-ui .pm-group {
  min-width:0;
  padding:19px;
  border:1px solid var(--pm-border);
  border-radius:19px;
  background:linear-gradient(145deg,#171b29,#11141e);
  box-shadow:inset 0 1px 0 #ffffff08;
}
.payment-ui .pm-group-title {
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom:19px;
  font-size:15px;
  font-weight:700;
  letter-spacing:-.2px;
}
.payment-ui .pm-group-title svg {
  width:22px;
  height:22px;
  flex-shrink:0;
  color:#aeb8d3;
}
.payment-ui .pm-logos {
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  align-items:center;
  gap:12px;
}
.payment-ui .pm-logo {
  height:68px;
  min-width:0;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:9px 12px;
  border-radius:14px;
  background:#fff;
  border:1px solid #ffffff20;
  overflow:hidden;
  transition:transform .2s ease,box-shadow .2s ease;
}
.payment-ui .pm-logo:hover {
  transform:translateY(-2px);
  box-shadow:0 7px 17px #0005;
}
.payment-ui .pm-logo img {
  display:block;
  width:100%;
  height:100%;
  max-width:145px;
  max-height:54px;
  object-fit:contain;
  object-position:center;
}
.payment-ui .pm-logo.logo-visa img {
  max-width:160px;
  max-height:59px;
  transform:scale(1.13);
}
.payment-ui .pm-logo.logo-master img {
  max-width:145px;
  max-height:58px;
  transform:scale(1.14);
}
.payment-ui .pm-logo.logo-amex img {
  max-width:128px;
  max-height:58px;
  transform:scale(1.13);
}
.payment-ui .pm-logo.logo-naranja img {
  max-width:64px;
  max-height:64px;
  border-radius:7px;
  transform:scale(1.12);
}
.payment-ui .pm-logo.logo-visa-debit {
  padding:5px;
}
.payment-ui .pm-logo.logo-visa-debit img {
  max-width:100%;
  max-height:100%;
  transform:scale(1.65);
}
.payment-ui .pm-logo.logo-maestro img {
  max-width:110px;
  max-height:55px;
}
.payment-ui .pm-logo.logo-mp {
  padding:5px;
}
.payment-ui .pm-logo.logo-mp img {
  max-width:none;
  max-height:none;
  width:100%;
  height:100%;
  transform:scale(1.85);
}
.payment-ui .pm-logo.logo-pagofacil img {
  max-width:125px;
  max-height:56px;
}
.payment-ui .pm-logo.logo-rapipago {
  background:#28165d;
}
.payment-ui .pm-logo.logo-rapipago img {
  max-width:145px;
  max-height:52px;
}
.payment-ui .pm-security {
  display:flex;
  align-items:center;
  gap:18px;
  margin-top:15px;
  padding:18px 22px;
  min-height:116px;
  border:1px solid var(--pm-border);
  border-radius:19px;
  background:linear-gradient(110deg,#151a26,#10141f);
}
.payment-ui .pm-shield {
  width:43px;
  height:43px;
  flex-shrink:0;
  color:var(--pm-accent);
}
.payment-ui .pm-security-divider {
  width:2px;
  height:52px;
  background:var(--pm-accent);
  opacity:.8;
}
.payment-ui .pm-security-copy {
  flex:1;
  min-width:0;
}
.payment-ui .pm-security-copy strong {
  display:block;
  font-size:16px;
  font-weight:700;
  color:var(--pm-text);
}
.payment-ui .pm-security-copy span {
  display:block;
  margin-top:5px;
  color:var(--pm-muted);
  font-size:14px;
}
.payment-ui .pm-mercadopago {
  display:flex;
  align-items:center;
  justify-content:center;
  min-width:155px;
  align-self:stretch;
  padding-left:25px;
  border-left:1px solid var(--pm-border);
}
.payment-ui .pm-mercadopago img {
  display:block;
  width:100px;
  height:100px;
  max-width:100%;
  object-fit:contain;
  object-position:center;
  border-radius:18px;
}

@media(max-width:850px) {
  .payment-ui .pm-groups {
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
  .payment-ui .pm-group:last-child {
    grid-column:1/-1;
  }
  .payment-ui .pm-group:last-child .pm-logos {
    grid-template-columns:repeat(3,minmax(0,1fr));
  }
  .payment-ui .pm-mercadopago {
    min-width:125px;
  }
}

@media(max-width:560px) {
  .payment-ui {
    padding:15px;
    border-radius:17px;
  }
  .payment-ui .pm-header {
    gap:12px;
    flex-wrap:wrap;
  }
  .payment-ui .pm-main-icon {
    width:48px;
    height:48px;
    border-radius:13px;
  }
  .payment-ui .pm-main-icon svg {
    width:25px;
    height:25px;
  }
  .payment-ui .pm-heading h2 {
    font-size:22px;
  }
  .payment-ui .pm-heading p {
    font-size:12px;
  }
  .payment-ui .pm-secure-badge {
    margin-left:0;
    padding:8px 11px;
    font-size:11px;
  }
  .payment-ui .pm-groups {
    grid-template-columns:1fr;
    gap:11px;
  }
  .payment-ui .pm-group,
  .payment-ui .pm-group:last-child {
    grid-column:auto;
    padding:16px;
    border-radius:16px;
  }
  .payment-ui .pm-group-title {
    font-size:14px;
    margin-bottom:15px;
  }
  .payment-ui .pm-logos {
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:9px;
  }
  .payment-ui .pm-group:last-child .pm-logos {
    grid-template-columns:repeat(3,minmax(0,1fr));
  }
  .payment-ui .pm-logo {
    height:62px;
    padding:7px;
    border-radius:11px;
  }
  .payment-ui .pm-logo img {
    max-height:48px;
  }
  .payment-ui .pm-logo.logo-visa-debit img {
    transform:scale(1.55);
  }
  .payment-ui .pm-logo.logo-mp img {
    transform:scale(1.65);
  }
  .payment-ui .pm-security {
    flex-wrap:wrap;
    gap:11px;
    padding:15px;
  }
  .payment-ui .pm-shield {
    width:31px;
    height:31px;
  }
  .payment-ui .pm-security-divider {
    height:33px;
  }
  .payment-ui .pm-security-copy strong {
    font-size:13px;
  }
  .payment-ui .pm-security-copy span {
    font-size:11px;
  }
  .payment-ui .pm-mercadopago {
    width:100%;
    min-width:0;
    min-height:90px;
    border-left:0;
    border-top:1px solid var(--pm-border);
    padding:10px 0 0;
    justify-content:center;
  }
  .payment-ui .pm-mercadopago img {
    width:85px;
    height:85px;
    border-radius:15px;
  }
}
</style>

<header class="pm-header">
  <div class="pm-main-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <rect x="2.5" y="4" width="19" height="16" rx="3"/>
      <path d="M2.5 9h19M6 15h5"/>
    </svg>
  </div>

  <div class="pm-heading">
    <h2>Medios de Pago</h2>
    <p>Elegí cómo querés pagar. Comprá de forma segura.</p>
  </div>

  <div class="pm-secure-badge">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2 20 5v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3Z"/>
      <path d="m8.5 12 2.3 2.3 4.7-5"/>
    </svg>
    Compra Segura
  </div>
</header>

<div class="pm-groups">

  <div class="pm-group">
    <div class="pm-group-title">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <rect x="2" y="4" width="20" height="16" rx="3"/>
        <path d="M2 9h20M6 15h5"/>
      </svg>
      Tarjetas de crédito
    </div>

    <div class="pm-logos">
      <div class="pm-logo logo-visa">
        <img src="https://i.postimg.cc/SxYFyFcq/visa.webp" alt="Visa" loading="lazy">
      </div>
      <div class="pm-logo logo-master">
        <img src="https://i.postimg.cc/t4nQXQFj/images-%2815%29.png" alt="Mastercard" loading="lazy">
      </div>
      <div class="pm-logo logo-amex">
        <img src="https://i.postimg.cc/bwSczc1X/logo-amex-portada.jpg" alt="American Express" loading="lazy">
      </div>
      <div class="pm-logo logo-naranja">
        <img src="https://i.postimg.cc/vZxFQFf2/channels4-profile.jpg" alt="Naranja X" loading="lazy">
      </div>
    </div>
  </div>

  <div class="pm-group">
    <div class="pm-group-title">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <rect x="2" y="4" width="20" height="16" rx="3"/>
        <path d="M2 9h20M6 15h5"/>
      </svg>
      Tarjetas de débito
    </div>

    <div class="pm-logos">
      <div class="pm-logo logo-visa-debit">
        <img src="https://i.postimg.cc/sgGdVd7T/visa-debito-ee7cdc2509.png" alt="Visa Débito" loading="lazy">
      </div>
      <div class="pm-logo logo-master">
        <img src="https://i.postimg.cc/t4nQXQFj/images-%2815%29.png" alt="Mastercard Débito" loading="lazy">
      </div>
      <div class="pm-logo logo-maestro">
        <img src="https://i.postimg.cc/4xHkJkV5/images-%2816%29.png" alt="Maestro" loading="lazy">
      </div>
    </div>
  </div>

  <div class="pm-group">
    <div class="pm-group-title">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <rect x="2" y="5" width="18" height="15" rx="3"/>
        <path d="M16 10h6v5h-6a2.5 2.5 0 0 1 0-5Z"/>
      </svg>
      Otros medios de pago
    </div>

    <div class="pm-logos">
      <div class="pm-logo logo-mp">
        <img src="https://i.postimg.cc/Y9zBJ6YM/mercadopago-logo-png-seeklogo-199533.png" alt="Mercado Pago" loading="lazy">
      </div>
      <div class="pm-logo logo-pagofacil">
        <img src="https://i.postimg.cc/YqsBKqGb/images-%2817%29.png" alt="Pago Fácil" loading="lazy">
      </div>
      <div class="pm-logo logo-rapipago">
        <img src="https://i.postimg.cc/KzDhdPBZ/4fa71efa2b42e14c3384c91c67a3e111bd336e9a-1920x1080.avif" alt="Rapipago" loading="lazy">
      </div>
    </div>
  </div>

</div>

<footer class="pm-security">
  <svg class="pm-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <path d="M12 2 20 5v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3Z"/>
    <path d="m8.5 12 2.3 2.3 4.7-5"/>
  </svg>

  <div class="pm-security-divider"></div>

  <div class="pm-security-copy">
    <strong>Pagos procesados de forma segura</strong>
    <span>A través de Mercado Pago.</span>
  </div>

  <div class="pm-mercadopago">
    <img src="https://i.postimg.cc/G2CHFjbC/mercadopago-logo-square-rounded-mercadopago-logo-free-download-mercadopago-logo-free-png.webp" alt="Mercado Pago" loading="lazy">
  </div>
</footer>

</section>
<!-- END PAYMENT METHODS UI -->
`;

    mount.innerHTML = html;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountPaymentFooter, { once: true });
  } else {
    mountPaymentFooter();
  }
})();
