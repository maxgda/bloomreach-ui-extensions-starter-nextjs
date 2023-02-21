import React from "react";
import {UiScope} from "@bloomreach/ui-extension";
import {Card} from "@mui/material";
import {EMPTY} from "../util/constants";

interface CmsContext {
    editMode,
    otherField,
    value
}

interface CmsFieldProperties {
    ui: UiScope
}

export default class UIComponent extends React.Component<CmsFieldProperties, CmsContext> {

    constructor(props: CmsFieldProperties) {
        super(props);

        this.state = {
            value: EMPTY,
            otherField: EMPTY,
            editMode: EMPTY
        }
    }

    componentDidMount() {
        this.getInitialItems(this.props.ui).catch(error => console.log(error));
    }

    async getInitialItems(ui: UiScope) {
        try {
            // get the config set in the CMS
            let config = JSON.parse(ui.extension.config);
            // get the current document
            const brDocument = await ui.document.get();
            // set value for current field
            await this.setValue("Open UI string");
            // get value for current field
            let currentValue = await this.getValue();
            this.setState({value: currentValue});
            // example of getting other field
            this.setState({otherField: await this.getFieldValue("brxsaas:title")});
            this.setState({editMode: brDocument.mode});
        } catch (error: any) {
            console.error('Failed to register extension:', error.message);
            console.error('- error code:', error.code);
        }
    }

    async setValue(data) {
        return this.props.ui.document.field.setValue(JSON.stringify(data));
    }

    async getValue() {
        return await this.props.ui.document.field.getValue();
    }

    async getFieldValue(path) {
        return await this.props.ui.document.field.getValue(path);
    }

    async clearValue() {
        await this.props.ui.document.field.setValue(EMPTY);
    }

    render() {
        const {value, editMode, otherField} = this.state;
        return (<>
                <Card>
                    <p>value: {value}</p>
                    <p>edit mode: {editMode}</p>
                    <p>other field: {otherField}</p>
                </Card>
            </>
        );
    }
}


