import ts from "typescript";

// Course packages retain operator URLs; the public player serves cached assets.
export function courseAudioUrl(classroomId, sourceUrl) {
  if (!classroomId || !sourceUrl) return null;
  const file = new URL(sourceUrl, "https://openhw-explorer.invalid").pathname.split("/").pop();
  return file ? `/classroom-assets/${classroomId}/audio/${file}` : null;
}

// Parse route exports before modifying the disposable static-build copy.
export function forceStaticRoute(source, filename) {
  const parsed = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
    filename.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  for (const statement of parsed.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === "dynamic") {
        if (
          !declaration.initializer ||
          !ts.isStringLiteral(declaration.initializer) ||
          declaration.initializer.text !== "force-static"
        ) {
          throw new Error(`Cannot statically export runtime route: ${filename}`);
        }
        return source;
      }
    }
  }
  return source + '\nexport const dynamic = "force-static";\n';
}

export function withLocaleStaticParams(source, filename) {
  const parsed = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  for (const statement of parsed.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name?.text === "generateStaticParams")
      return source;
    if (
      ts.isVariableStatement(statement) &&
      statement.declarationList.declarations.some(
        (declaration) =>
          ts.isIdentifier(declaration.name) && declaration.name.text === "generateStaticParams",
      )
    )
      return source;
  }
  return (
    source +
    '\nexport function generateStaticParams() { return ["en", "zh"].map(locale => ({ locale })); }\n'
  );
}

export function assertNewsSnapshot(actual, digest, expectedCommit) {
  if (
    actual.editorialUpdatedAt !== digest.generatedAt ||
    actual.itemCount !== digest.items.length
  ) {
    throw new Error("Pages news snapshot does not match the checked-out digest");
  }
  const latest =
    digest.items
      .map((item) => item.publishedAt)
      .filter(Boolean)
      .sort()
      .at(-1) || null;
  if (actual.latestSourceDate !== latest) throw new Error("Pages latest source date differs");
  if (actual.commit !== expectedCommit) throw new Error("Pages deployment commit differs");
}
