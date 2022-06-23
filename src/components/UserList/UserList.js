import React, {useState,useRef} from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import axios from "axios";



const UserList = ({setFavUser, filterPressed, removeFavUser, isFavPage, users, isLoading}) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [isLoadingExtra, setIsLoadingExtra] = useState(users);
  const scrollRef = useRef() 
  var pageNumber = 1



  const fetchUsers =  ()=>{
    pageNumber=pageNumber+1;
    axios.get(`https://randomuser.me/api/?results=25&page=`, { params: { page: pageNumber }} ).then((res)=>{
      setIsLoadingExtra(true)
      res.data.results.forEach(x=>{
        users.push(x)
      })
      setIsLoadingExtra(false)
    })

  }

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };
  
  const handleScroll = (e) => {
    if (scrollRef.current && !isFavPage) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      
      //if the end of the list
      if (Math.round(scrollTop) + Math.round(clientHeight) === Math.round(scrollHeight)) {
        fetchUsers();
      }
    }
  }

  return (
    
    <S.UserList >
      {!isFavPage&&
      <S.Filters>
        <CheckBox value="BR" label="Brazil"  onChange={(status)=>filterPressed("Brazil",status)} />
        <CheckBox value="AU" label="Australia" onChange={(status)=>filterPressed("Australia",status)} />
        <CheckBox value="CA" label="Canada"  onChange={(status)=>filterPressed("Canada",status)} />
        <CheckBox value="GE" label="Germany" onChange={(status)=>filterPressed("Germany",status)} />
        <CheckBox value="SP" label="Spain" onChange={(status)=>filterPressed("Spain",status)} />
      </S.Filters>
      }

      <S.List onScroll={(e)=>handleScroll(e)} ref={scrollRef}>

          {users.map((user, index) => {

          return (
            
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={(index === hoveredUserId) || (localStorage.getItem(user.login.uuid)!=undefined || localStorage.getItem(user.login.uuid)!=null)} onClick={()=>{isFavPage?removeFavUser(user):setFavUser(user)}}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}

      </S.List>
    </S.UserList>
  );
};

export default UserList;

