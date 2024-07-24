const getSession = () => {
  const match = document.cookie.match(/(^| )session=([^;]+)/);
  return match ? JSON.parse(decodeURIComponent(match[2])) : null;
};

export default getSession;
