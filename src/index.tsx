import {StatelessComponent, ReactChild, ReactType} from 'react'
import {SketchPicker} from 'react-color'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withState from 'recompose/withState'
import styled from 'styled-components'
import {Row} from 'styled-material/dist/src/layout'

export const mediaMobile = '(max-width: 500px)'

const Swatch: StatelessComponent < {
  style?: any
  onClick: any
} > = styled.div`
  padding: 5px;
  background: #fff;
  borderRadius: 1px;
  boxShadow: 0 0 0 1px rgba(0, 0, 0, .1);
  display: inline-block;
  cursor: pointer;
`

const Color: StatelessComponent<{
  color: string
}> = styled(({color, ...props}) => <div {...props} style={{backgroundColor: color}} />)`
  width: 36px;
  height: 16px;
  borderRadius: 2px;
`
const Positioner = styled.div`
  z-index: 2;

  @media ${mediaMobile} {
    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 28px;
    left: 0;

    width: 100%;
    height: 100%;
  }
`
const Backtick: StatelessComponent<{
  style?: any
  onClick: () => void
}> = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;

  @media ${mediaMobile} {
    background-color: rgba(0, 0, 0, 0.12);
  }
`
const Popover = styled.div`
  position: absolute;
  z-index: 3;

  @media ${mediaMobile} {
    position: static;
  }
`

export type Props = {
  /**
   * Label to display for the input.
   */
  label: string
  /**
   * Callback when the color is modified.
   */
  onChange?: (updatedColor: string) => void
  /**
   * Button component to render the saveButton.
   */
  saveButton?: ReactType
  /**
   * A string or a rendered React component for the label to the save button.
   */
  saveLabel?: ReactChild
  /**
   * Callback when the save button is clicked.
   */
  onSave?: (event: Event) => void
}

export type PrivateProps = {
  open: boolean
  setOpen: (open: boolean) => void
  color: any
  setColor: (color: any) => void
}

const enhance = compose(
  withState('open', 'setOpen', false),
  withState('color', 'setColor', ({value}) => value),
  pure,
)

const Actions = styled.div`
  width: 200px;
  padding: 10px;
  box-sizing: initial;
  background: rgb(255, 255, 255);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.14902) 0px 0px 0px 1px, rgba(0, 0, 0, 0.14902) 0px 8px 16px;
  margin-top: -2px;
  display: flex;
  justify-content: flex-end;
`

export const ColorPicker = enhance(({
  open, setOpen,
  label, onChange,
  color, setColor,
  saveButton: SaveButton,
  saveLabel, onSave,
  ...props,
}: Props & PrivateProps) =>
  <Row vertical='center' style={{paddingBottom: 8}}>
    <label style={{paddingRight: 16}}>{label}</label>
    <Swatch onClick={() => setOpen(true)}>
      <Color color={color.rgb
        ? `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 1)`
        : color
      } />
    </Swatch>
    {open && <Positioner>
      <Backtick onClick={() => {
        setOpen(false)
        onChange(color.hex || color)
      }} />
      <Popover>
        <SketchPicker {...props}
          disableAlpha
          color={color}
          onChangeComplete={color => setColor(color)} />
        {SaveButton &&
          <Actions>
            {SaveButton &&
              <SaveButton onClick={event => {
                setOpen(false)

                if (onSave) {
                  onSave(event)
                }
              }}>
                {saveLabel}
              </SaveButton>
            }
          </Actions>
        }
      </Popover>
    </Positioner>
    }
  </Row>
)
