import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

function ShowRooms() {
    const { wareHouse, setSelectedRoomId, fetchProducts, selectedRoomId } = useContext(ProductContext);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        if (!selectedRoomId) {
            setSelectedRoomId(wareHouse[0]); 
        }
    }, [selectedRoomId, wareHouse]);

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
        setSelectedRoomId(room);
        fetchProducts();
    };

    return (
        <Menu>
            <MenuButton as={Button}>
                {selectedRoomId?.name || "Select Room"} 
            </MenuButton>
            <MenuList>
                {wareHouse.map((location) => (
                    <MenuItem  key={location.$id} onClick={() => handleRoomSelect(location)}>
                        {location.name}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}

export default ShowRooms;
