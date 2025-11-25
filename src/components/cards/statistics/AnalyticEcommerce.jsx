import PropTypes from 'prop-types';
// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';

// assets
import { TrendingUp, TrendingDown } from '@mui/icons-material';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function AnalyticEcommerce({ color = 'primary', title, count, percentage, isLoss, extra, icon: IconComponent }) {
  return (
    <MainCard 
      border={false}
      contentSX={{ p: 2.25 }}
      sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 120,
        border: 2, 
        borderColor: `${color}.main`,
        '&:hover': {
          boxShadow: 4
        }
      }}
    >
      <Stack sx={{ gap: 0.5, height: '100%' }}>
        <Typography 
          variant="h6" 
          color="text.primary" 
          fontWeight={600}
          sx={{ 
            minHeight: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          {IconComponent && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: `${color}.main`
              }}
            >
              <IconComponent sx={{ fontSize: '1.5rem' }} />
            </Box>
          )}
          {title}
        </Typography>
        <Grid container sx={{ alignItems: 'center' }}>
          <Grid>
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
          </Grid>
          {percentage && (
            <Grid>
              <Chip
                variant="combined"
                color={color}
                icon={isLoss ? <TrendingDown style={iconSX} /> : <TrendingUp style={iconSX} />}
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
    </MainCard>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string,
  icon: PropTypes.elementType
};
