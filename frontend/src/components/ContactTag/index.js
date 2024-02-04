import { makeStyles } from '@material-ui/styles'
import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'
import React from 'react'

const useStyles = makeStyles(theme => ({
  tag: {
    fontSize: 11,
    width: 88,
    color: '#FFF',
    marginRight: '5px',
    whiteSpace: 'nowrap',
    marginTop: 4
  }
}))

const ContactTag = ({ tag }) => {
  const classes = useStyles()

  return (
    <Tooltip title={tag.name.toUpperCase()} placement="top-end" arrow size="md">
      <Chip
        size="small"
        className={classes.tag}
        style={{ backgroundColor: tag.color, marginTop: '2px' }}
        label={tag.name.toUpperCase()}
      />
    </Tooltip>
  )
}

export default ContactTag
