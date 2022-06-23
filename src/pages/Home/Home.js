import React, { useEffect, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";


const Home = () => {
  const { users, isLoading } = usePeopleFetch();
  const [countriesArr, setCountriesArr] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  
  useEffect(()=>{
    setFilteredUsers(users)
  },[users])


  useEffect(()=>{
    if(countriesArr.length>0){
      setFilteredUsers(users.filter(u=>countriesArr.includes(u.location.country)))
    }else{
      setFilteredUsers(users)
    }
  },[countriesArr])


  const filterProcess = (value,status)=>{
      if(status==true){
        setCountriesArr([...countriesArr,value])
      }else{
        setCountriesArr(countriesArr.filter(v=>v!=value))
      }
  }

  const setUserFavPressed = (user)=>{
    if(localStorage.getItem(user.login.uuid)!=undefined ||localStorage.getItem(user.login.uuid)!=null){
        localStorage.removeItem(user.login.uuid)
      }else{
        localStorage.setItem(user.login.uuid,JSON.stringify(user))
  
      }
    }

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList  setFavUser={setUserFavPressed} filterPressed={filterProcess} users={filteredUsers} isLoading={isLoading} isFavPage={false}/>
      </S.Content>
    </S.Home>
  );
};

export default Home;
