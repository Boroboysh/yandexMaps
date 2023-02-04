import * as React from 'react';
import {Layout} from "@consta/uikit/Layout";
import {Text} from "@consta/uikit/Text";
import {useState} from "react";

let Profile = () => {
    let {name, setName} = useState('...');

    // setName(GetCurrentUsername())

    return (
        <Layout>
            <Text>
                Your Profile
            </Text>
            <Text>
                {name}
            </Text>
        </Layout>
    );
};

export default Profile;