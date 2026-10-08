import type { NextPageContext } from 'next'
import { ErrorPage } from '@/components/ErrorPage'
import * as React from 'react'
import { site } from 'lib/config'

function CustomErrorPage({ statusCode }: { statusCode: number }) {
  return <ErrorPage site={site} statusCode={statusCode} />
}

CustomErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default CustomErrorPage
