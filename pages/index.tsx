import type {NextPage} from 'next'
import UiExtension from "@bloomreach/ui-extension";
import React, {useEffect, useState} from "react";
import {CircularProgress, NoSsr} from "@mui/material";
import UIComponent from "../components/UIComponent";

const Field: NextPage = () => {

  const [component, setComponent] = useState(<CircularProgress/>)

  useEffect(() => {
    try {
      UiExtension.register().then(ui => {
        setComponent(<UIComponent ui={ui}/>);
      });
    } catch (e: any) {
      console.error(e.message)
    }
  }, [])
  return <NoSsr>{component}</NoSsr>
}

export default Field
