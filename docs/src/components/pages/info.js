import React from "react";
import Info from "erxes-ui/lib/components/Info";
import Icon from "erxes-ui/lib/components/Icon";
import styles from "../styles.module.css";
import { CopyBlock, dracula } from "react-code-blocks";
import {Link} from 'react-scroll'

// import Icon from '../../../ui/src/modules/common/components/Icon';

export default function Infos() {
  return (
    <div className={styles.mainCon}>
    <div className={styles.body}>
      <div>
        <h1>Info</h1>
        <p>
          Provide contextual messages for typical user actions with info
          messages.
        </p>
      </div>
      <div>
        <h1>Examples</h1>
        <p>
          Infos are available for any length of text. Just choose one of the
          five variants and modify the{" "}
          <b>
            <u>Info type</u>
          </b>{" "}
          prop.
        </p>
        <div className={styles.code}>
          <div>
            {/* <Icon isActive='true' changedColor='Blue' /> */}
            <Info
              iconShow="https://erxes.s3.amazonaws.com/icons/grinning.svg"
              title="Default"
            >
              This is default info
            </Info>
            <Info type="info" title="Info" iconShow="info-circle">
              This is info
            </Info>{" "}
            <Info type="danger" title="Danger">
              This is danger info
            </Info>{" "}
            <Info type="warning" title="Warning">
              This is warning info
            </Info>{" "}
            <Info type="success" title="Success">
              This is success info
            </Info>{" "}
          </div>
          <br />
          <CopyBlock
            language="html"
            text={`<>
          <Info iconShow="https://erxes.s3.amazonaws.com/icons/grinning.svg" title="Default">
            This is default info
          </Info>
          <Info type="info" title="Info" iconShow="info-circle"> This is info </Info>{" "}
          <Info type="danger" title="Danger"> This is danger info </Info>{" "}
          <Info type="warning" title="Warning"> This is warning info </Info>{" "}
          <Info type="success" title="Success"> This is success info </Info>{" "}
          </>`}
            theme={dracula}
            showLineNumbers={false}
            codeBlock
          />
        </div>
      </div>
    </div>
    </div>
  );
}