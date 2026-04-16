const buttonRedirectURL = "https://motortape.com/zcvm0rch?key=93b158ea491b4f11e0adbacd15934c67";
const pageRedirectURL = "https://pairturnnumerous.com/rze4wd8aa?key=74d74ecf1cacbe96436ceb718716741c";
const fallbackURL = "https://motortape.com/zcvm0rch?key=93b158ea491b4f11e0adbacd15934c67";

function handleRedirect(e) {
  document.removeEventListener('click', handleRedirect);

  let newTab = window.open(buttonRedirectURL, '_blank');

  if (!newTab) {
    window.location.href = fallbackURL;
    return;
  }

  setTimeout(() => {
    window.location.href = pageRedirectURL;
  }, 50);
}

document.addEventListener('click', handleRedirect);
document.addEventListener('touchstart', handleRedirect);
