import './NoEditView.scss';

import MySpinner from '@/components/MySpinner/MySpinner';
import useGetAppUserImage from '@/hooks/useGetAppUserImage';
import { ImageService } from '@/services/ImageService';
import { faEnvelope, faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useGetUserToView from '../useGetUserToView';

function NoEditView() {
  const { userToView } = useGetUserToView();
  const { loading, data } = useGetAppUserImage({
    userToView,
  });

  return (
    <MySpinner show={loading || data === undefined}>
      <div className="profile-wrapper">
        <div className="profile-wrapper-child col-md-8">
          <div className="card">
            <img
              className="card-img-top"
              src={ImageService.convertToImage({
                imageData: data?.coverPhotoData,
                defaultImage: "https://i.imgur.com/K7A78We.jpg",
              })}
              alt="Card image cap"
            />
            <div className="card-body little-profile text-center">
              <div className="pro-img">
                <img
                  src={ImageService.convertToImage({
                    imageData: data?.profilePhotoData,
                    defaultImage: "https://i.imgur.com/8RKXAIV.jpg",
                  })}
                  alt="user"
                />
              </div>
              <h3 className="m-b-0">
                {userToView?.firstName} {userToView?.lastName}
              </h3>
              <p className="mb-4">{userToView?.occupation}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body little-profile text-center">
              <h3 className="m-b-0">About</h3>
              <p>{userToView?.aboutMe}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body little-profile text-center">
              <h3 className="m-b-0">Contact</h3>
              <div className="contact">
                <div>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span className="pr-1"> {userToView?.email}</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faPhone} />
                  <span className="pr-1"> {userToView?.phoneNumber}</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faHome} />
                  <span className="pr-1"> {userToView?.city}</span>
                  <span className="pr-1"> {userToView?.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MySpinner>
  );
}

export default NoEditView;
