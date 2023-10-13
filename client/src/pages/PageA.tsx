import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Item} from '../types/user'
import {getAllItems, getItems} from '../api/login'
import ItemList from '../components/ItemList'
import {useRecoilValue} from "recoil";
import {UserAtom} from "../atoms/user";

const PageA = () => {
    const [items, setItems] = useState<Item[] | null>(null)
    const isUserItemsFetched = useRef(false)

    const userInfo = useRecoilValue(UserAtom)

    // TODO 4-2: getItems를 호출하여 userItem을 가져온 경우 상태 업데이트
    const fetchUserItems = useCallback(async () => {

        if (userInfo?.userInfo.roles.includes("admin")) {
            const userAllItems = await getAllItems()
            if (userAllItems) {
                setItems(userAllItems)
            }

        } else {
            const userItems = await getItems()
            if (userItems) {
                setItems(userItems)
            }
        }
        isUserItemsFetched.current = true


    }, [])


    useEffect(() => {
        if (!isUserItemsFetched.current) fetchUserItems()
    }, [])

    return (<div>
        <h1>
            Page A
        </h1>
        <ItemList items={items}/>
    </div>)
}

export default PageA
