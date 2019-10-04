import React from 'react';
import axios from "axios";
import crypto from 'crypto';
import fs from 'browserify-fs';

export default class TestData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: ''
        }

        let file = '';

        this.getData = this.getData.bind(this)
        this.decrypt = this.decrypt.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        axios.get('http://localhost:5000/api/sender')
            .then(res => {
                console.log('TestData: ', res)
                if ( res.data.status === 'OK' ) {
                    const val = this.decrypt(res.data.enData, res.data.key)
                    this.setState({file: val})
                }
            })
    }

    decrypt(text, key) {
        let iv = Buffer.from(text.iv, 'hex');
        let encryptedText = Buffer.from(text.encryptedData, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

    render() {
        return (
            <>
                <p>Testing Data Encoding and Decoding....</p>
                <p><strong>Data: </strong>{this.state.file}</p>
            </>
        )
    }
}