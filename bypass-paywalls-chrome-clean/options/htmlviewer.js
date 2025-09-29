
if (window.location.href === 'https://codebeautify.org/htmlviewer') {
  let htmlviewer = document.querySelector('head > link[rel="canonical"][href="https://codebeautify.org/htmlviewer"]');
  if (!htmlviewer) {
    let ads = 'div.OUTBRAIN, div[id^="taboola-"], div.ad-container, div[class*="-ad-container"], div[class*="_ad-container"], div.arc_ad, div[id^="adv-"], div[class^="ad-"], div[class^="ad_"], div[class^="advert"], aside.ad, div[id^="adUnit"], div[id^="ads-"]';
    hideDOMStyle(ads, 10);
    let cookie_consent = 'div#didomi-host, div#onetrust-consent-sdk, div[id^="sp_message_container"], div#CybotCookiebotDialog, div#usercentrics-root, div.cmp-root-container';
    hideDOMStyle(cookie_consent, 11);
    let cybot_fade = document.querySelector('div#CybotCookiebotDialogBodyUnderlay');
    if (cybot_fade)
      cybot_fade.remove();
    let html_noscroll = ['cmp-modal-open', 'sp-message-open'];
    for (let elem of html_noscroll) {
      let noscroll = document.querySelector('html[class~="' + elem + '"]');
      if (noscroll)
        noscroll.classList.remove(elem);
    }
    let body_noscroll = ['didomi-popup-open', 'no-scroll', 'oneTrustMobile', 'overflowHidden', 'showFirstLayer'];
    for (let elem of body_noscroll) {
      let noscroll = document.querySelector('body[class~="' + elem + '"]');
      if (noscroll)
        noscroll.classList.remove(elem);
    }
    let overflow_hidden = document.querySelector('body[style*="overflow: hidden;"]');
    if (overflow_hidden)
      overflow_hidden.style.overflow = 'auto';

    unhideDataImages();
    let hide;
    let canonical = document.querySelector('head > link[rel="canonical"][href], head > meta[property="og:url"][content]');
    if (canonical) {
      let canonical_url = canonical.href || canonical.content;
      let hostname = urlHost(canonical_url);
      correctLinks(hostname);
      unhideHostImages(hostname);

      if (hostname.endsWith('.de')) {
        if (matchUrlDomain(['allgaeuer-zeitung.de', 'augsburger-allgemeine.de'], canonical_url)) {
          let videos = document.querySelectorAll('div.ppg_content_container:has(turbo-source[src])');
          for (let elem of videos) {
            let turbo_source = elem.querySelector('turbo-source[src][type="video/mp4"]');
            if (turbo_source) {
              let iframe = document.createElement('iframe');
              iframe.src = turbo_source.getAttribute('src');
              elem.parentNode.replaceChild(iframe, elem);
            }
          }
          let flourish_embeds = document.querySelectorAll('div.flourish-embed[data-url]');
          for (let elem of flourish_embeds) {
            let embed_link = document.createElement('a');
            embed_link.href = embed_link.innerText = elem.getAttribute('data-url');
            embed_link.target = '_blank';
            elem.before(embed_link);
          }
          hide = 'div.pt_onlinestory';
        } else if (matchUrlDomain('die-tagespost.de', canonical_url)) {
          hide = 'section#footer-popup';
        } else if (matchUrlDomain('lkz.de', canonical_url)) {
          let article_hidden = document.querySelector('div#main');
          if (article_hidden)
            article_hidden.removeAttribute('id');
          hide = 'div.nfy-element-ad, div.error-screen';
        } else if (matchUrlDomain('main-echo.de', canonical_url)) {
          document.querySelectorAll('[hidden]').forEach(e => e.removeAttribute('hidden'));
          hide = 'div[id^="traffective-ad-"]';
        } else if (matchUrlDomain('mainpost.de', canonical_url)) {
          hide = 'div.aa-first-layer';
        } else if (matchUrlDomain(['noz.de', 'shz.de'], canonical_url)) {
          hide = 'div.msn-ads';
        } else if (matchUrlDomain('riffreporter.de', canonical_url)) {
          let header_img = document.querySelector('header img[style]');
          if (header_img)
            header_img.removeAttribute('style');
          let article = document.querySelector('article');
          if (article)
            article.style.margin = '20px';
          hide = 'div.MuiTableContainer-root, button.MuiButtonBase-root, footer';
        } else if (matchUrlDomain('wissenschaft.de', canonical_url)) {
          hide = 'div#lightbox';
        } else if (matchUrlDomain('wiwo.de', canonical_url)) {
          document.querySelectorAll('app-iframe > iframe[style]').forEach(e => e.style.height = '500px');
        } else if (matchUrlDomain('zeit.de', canonical_url)) {
          let animated_video = document.querySelector('header picture.js-animated-video[hidden]');
          if (animated_video) {
            animated_video.removeAttribute('hidden');
            let video_container = animated_video.parentNode.querySelector('picture + div');
            if (video_container)
              video_container.remove();
          }
          let embed_wrappers = document.querySelectorAll('div.embed-wrapper > div.embed');
          for (let elem of embed_wrappers) {
            let html = elem.innerHTML;
            if (html.includes('class="embed__iframe"') && html.includes('src="')) {
              let iframe = document.createElement('iframe');
              iframe.src = html.split('src="')[1].split('"')[0];
              iframe.style = 'width: 100%; height: 500px; border: none;';
              elem.parentNode.replaceChild(iframe, elem);
              iframe.parentNode.style = 'margin: 10px 150px;';
            }
          }
          hide = 'div[id^="iqadtile"], .iqdcontainer';
        } else if (matchUrlDomain('zvw.de', canonical_url)) {
          hide = '.nfy-banner';
        }
      } else if (hostname.endsWith('.fi')) {
        if (matchUrlDomain(['aamulehti.fi', 'hs.fi', 'is.fi'], canonical_url)) {
          hide = 'header, footer, div.article-actions, div.skip-link, article.list, iframe[data-testid="iframe-embed"]';
          let image_containers = document.querySelectorAll('div.aspect-ratio-container');
          for (let elem of image_containers)
            elem.classList.remove('aspect-ratio-container');
        }
      } else if (hostname.endsWith('.fr')) {
        if (matchUrlDomain('humanite.fr', canonical_url)) {
          hide = 'tab-bar-component, div#form_don';
        }
      } else if (hostname.endsWith('.uk')) {
        if (matchUrlDomain('artsprofessional.co.uk', canonical_url)) {
          let body = document.querySelector('body');
          if (body)
            body.style.margin = '20px';
          hide = 'div.UserBar, div.ap-in-content-news';
        } else if (matchUrlDomain('investorschronicle.co.uk', canonical_url)) {
          hide = 'div#specialist__renderer--header';
        }
      } else {
        if (matchUrlDomain(['businesslive.co.za', 'timeslive.co.za'], canonical_url)) {
          hide = 'div#gdpr-overlay';
        } else if (matchUrlDomain('dnevnik.bg', canonical_url)) {
          document.querySelectorAll('div.swiper-wrapper').forEach(e => e.removeAttribute('class'));
          document.querySelectorAll('div.swiper > div[style^="transition-duration"]').forEach(e => e.removeAttribute('style'));
        } else if (matchUrlDomain('faz.net', canonical_url)) {
          hide = 'div.iqdcontainer, div[data-fsw="market"], section[data-external-selector="job-recommendations"]';
        } else if (matchUrlDomain(['ibj.com', 'insideindianabusiness.com', 'theindianalawyer.com'], canonical_url)) {
          hide = 'header#masthead, header.site-header, nav, footer, aside#secondary, div.article-audio, div.article-left-rail, div.promo-container, div.toolbar';
          document.querySelectorAll('article p').forEach(e => e.removeAttribute('style'));
        } else if (matchUrlDomain('nouvelobs.com', canonical_url)) {
          hide = 'div[class^="paywall"], div.dfp-slot';
        } else if (matchUrlDomain('politiken.dk', canonical_url)) {
          hide = 'aside.z-30';
          let factboxes = document.querySelectorAll('div.js-factbox-bodytext-clamped');
          for (let elem of factboxes) {
            elem.style['max-height'] = 'none';
            let buttons = 'button, div:empty';
            hideDOMStyle(buttons, 2);
          }
        } else if (matchUrlDomain('repubblica.it', canonical_url)) {
          hide = 'div.cookiewall, div[data-src^="//box.kataweb.it/"]';
        } else if (matchUrlDomain('telecompaper.com', canonical_url)) {
          hide = 'div[role="dialog"]';
        }
      }
    }
    if (hide)
      hideDOMStyle(hide);
  }
}

function matchDomain(domains, hostname = window.location.hostname) {
  if (typeof domains === 'string')
    domains = [domains];
  return domains.find(domain => hostname === domain || hostname.endsWith('.' + domain)) || false;
}

function urlHost(url) {
  if (/^http/.test(url)) {
    try {
      return new URL(url).hostname;
    } catch (e) {
      console.log(`url not valid: ${url} error: ${e}`);
    }
  }
  return url;
}

function matchUrlDomain(domains, url) {
  return matchDomain(domains, urlHost(url));
}

function hideDOMStyle(selector, id = 1) {
  let style = document.querySelector('head > style#ext'+ id);
  if (!style && document.head) {
    let sheet = document.createElement('style');
    sheet.id = 'ext' + id;
    sheet.innerText = selector + ' {display: none !important;}';
    document.head.appendChild(sheet);
  }
}

function correctLinks(hostname) {
  let links = document.querySelectorAll('a[href^="/"], link[rel*="stylesheet"][href^="/"]');
  for (let elem of links)
    elem.href = elem.href.replace('codebeautify.org', hostname);
}

function unhideHostImages(hostname) {
  let hidden_images = document.querySelectorAll('img[src^="/"]');
  for (let elem of hidden_images) {
    elem.src = elem.src.replace('codebeautify.org', hostname);
    elem.removeAttribute('srcset');
    let sources = elem.parentNode.querySelectorAll('source[srcset]');
    for (let source of sources)
      source.removeAttribute('srcset');
  }
}

function unhideDataImages() {
  let hidden_images = document.querySelectorAll('img[src^="data:image/"]');
  for (let elem of hidden_images) {
    if (elem.getAttribute('data-src'))
      elem.src = elem.getAttribute('data-src');
    else if (elem.parentNode) {
      let source = elem.parentNode.querySelector('source[data-srcset]');
      if (source) {
        elem.src = source.getAttribute('data-srcset').split(/[\?\s]/)[0];
      }
    }
  }
}
