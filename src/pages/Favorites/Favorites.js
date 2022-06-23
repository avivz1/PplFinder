import React, { useEffect, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Favorites = () => {
  const [favUsers,setFavUsers] = useState([])
  
  useEffect(()=>{
    var arr = []
    for (const [key, value] of Object.entries(localStorage)) {
      arr.push(JSON.parse(value))
   }
   setFavUsers(arr)
  },[])

  const removeFav = (user)=>{
    setFavUsers(favUsers.filter(u=>u!=user))
    localStorage.removeItem(user.login.uuid)
  }



  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites Users
          </Text>
        </S.Header>
        <UserList  users={favUsers} isFavPage={true} removeFavUser={removeFav} />
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
