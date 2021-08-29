import type { Video } from 'src/services/openapi';

const api_url = process.env.REACT_APP_API_URL;
const client_id = process.env.REACT_APP_OAUTH_CLIENT_ID || '';
const client_secret = process.env.REACT_APP_OAUTH_CLIENT_SECRET || '';

export const getVideoInformation = (
  videoId: string,
  // eslint-disable-next-line no-unused-vars
  callback: (m: Video) => void
) => {
  // TODO: replace this custom method with the automatically generated `VideoService.videoRetrieve``
  // VideoService.videoRetrieve is currently not used because the URL is incorrect
  fetch(`${api_url}/video/${videoId}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const name = data[0]['name'];
      const publication_date = data[0]['publication_date'];
      const uploader = data[0]['uploader'];
      const views = data[0]['views'];
      const description = data[0]['description'];
      callback({
        name,
        publication_date,
        uploader,
        views,
        video_id: videoId,
        description,
      });
    })
    .catch((err) => {
      console.log(err);
      callback({
        name: 'Missing Information',
        publication_date: '',
        uploader: '',
        views: 0,
        video_id: videoId,
        description: '',
      });
    });
};
